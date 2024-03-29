
/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import RecommendIcon from '@mui/icons-material/Recommend';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Drinkpage() {

  const loggedIn = localStorage.getItem('logged_in');
  const username = localStorage.getItem('username');
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [drink, setDrink] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDrink = async () => {
      const res = await fetch(`/drink/${id}`);
      const data = await res.json();
      //console.log("data:", data); USE FOR DEBUGGING
      setDrink(data);
    };
    fetchDrink();
  }, [id]);


  const [og_rating_value, setRatingValue] = useState(null);
  const [taste_rating_value, setTasteValue] = useState(null);
  const [favorited, setFavorited] = useState(null);
  // This method fetches the user's favorites list from the database.
  useEffect(() => {
      async function getUserInfo() {
          const fetch_string = process.env.NODE_ENV === 'production' ?
                         'https://mix-master.herokuapp.com/user/retrieve_storage/'+username : 
                         'http://localhost:5005/user/retrieve_storage/'+username;
          const response = await fetch(fetch_string);
          if (!response.ok) {
              const message = `An error occurred: ${response.statusText}`;
              window.alert(message);
              return;
          }
          const users_info = await response.json();
          setFavorited(users_info.favorites_list.includes(id) === true ? 1 : null);
          var i = users_info.overall_ratings.findIndex(e => e.drink_id === id);
          if (i > -1) {
            setRatingValue(users_info.overall_ratings[i].rating);
          }
          i = users_info.taste_ratings.findIndex(e => e.drink_id === id);
          if (i > -1) {
            setTasteValue(users_info.taste_ratings[i].rating);
          }
      }
      getUserInfo();
      return;
  }, []);

  if (!drink) return <div>Loading...</div>;
  //console.log(drink); USE FOR DEBUGGING
  const ingredients = drink.drink_ingredients.map((ingredient) => (
    <p key={ingredient.name}>
      {ingredient.name}: {ingredient.amount}
    </p>
  ));

  const handleFavoriteChange = (newValue) => {
    if(loggedIn === null) {
      console.log("ERROR: You must be logged in to use this feature!");
      return;
    }
    updateFavorite(newValue);
  }

  async function updateFavorite(newValue) {
    // Assume favoriting drink, if not these variables will be updated
    let fetch_string = (process.env.NODE_ENV === 'production' ?
    'https://mix-master.herokuapp.com/user/add_drink_to_favorites/'+username : 
    'http://localhost:5005/user/add_drink_to_favorites/'+username);
    let fetch_method = "POST";

    // Update variables if favorite star was unchecked
    if(newValue === null) {
      fetch_string = (process.env.NODE_ENV === 'production' ?
        'https://mix-master.herokuapp.com/user/delete_drink_from_favorites/'+username : 
        'http://localhost:5005/user/delete_drink_from_favorites/'+username);
      fetch_method = "DELETE";
    }

    // Tell node to update database
    await fetch(fetch_string, {
        method: fetch_method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: drink._id}),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        setFavorited(favorited === 1 ? null : 1);
        return;
    })
    .catch(error => {
        window.alert(error);
        return;
    });
  }


  const handleORatingChange = (event, newValue) => {
    if(loggedIn === null) {
      console.log("ERROR: You must be logged in to use this feature!");
      return;
    }
    // If star unchecked do nothing
    if(newValue === null) {
      console.log("ERROR: You cannot rate 0 stars!");
      return;
    }
    var old_rating_val = og_rating_value;
    setRatingValue(newValue);
    updateRating(old_rating_val, newValue, "overall");
  };
  const handleTRatingChange = (event, newValue) => {
    if(loggedIn === null) {
      console.log("ERROR: You must be logged in to use this feature!");
      return;
    }
    // If star unchecked do nothing
    if(newValue === null) {
      console.log("ERROR: You cannot rate 0 stars!");
      return;
    }
    var old_rating_val = taste_rating_value;
    setTasteValue(newValue);
    updateRating(old_rating_val, newValue, "taste");
  };

  async function updateRating(old_rating, new_rating, rating_type) {
    //console.log(username + " is changing their rating from " + old_rating + " to " \
    //            + new_rating + " for " + rating_type + " for " + drink.name);
    // Assume favoriting drink, if not these variables will be updated
    let fetch_string = (process.env.NODE_ENV === 'production' ?
    'https://mix-master.herokuapp.com/user/rate_drink_'+rating_type : 
    'http://localhost:5005/user/rate_drink_'+rating_type);

    if(old_rating === null) {
      fetch_string = (process.env.NODE_ENV === 'production' ?
        'https://mix-master.herokuapp.com/user/first_rate_drink_'+rating_type : 
        'http://localhost:5005/user/first_rate_drink_'+rating_type);
    }
    // console.log(fetch_string); FOR DEBUGGING
    // Tell node to update database
    await fetch(fetch_string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: drink._id, username: username, rating: new_rating}),
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        updateDrinksRating(old_rating, new_rating, rating_type);
        return;
    })
    .catch(error => {
        window.alert(error);
        return;
    });
  }

  async function updateDrinksRating(old_rating, new_rating, rating_type) {
    let fetch_string = (process.env.NODE_ENV === 'production' ?
    'https://mix-master.herokuapp.com/drink/rate_drink_'+rating_type :
    'http://localhost:5005/drink/rate_drink_'+rating_type);

    if(old_rating === null) {
      fetch_string = (process.env.NODE_ENV === 'production' ?
        'https://mix-master.herokuapp.com/drink/first_rate_drink_'+rating_type :
        'http://localhost:5005/drink/first_rate_drink_'+rating_type);
    }
    // console.log(fetch_string); FOR DEBUGGING
    // Tell node to update database
    await fetch(fetch_string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: drink._id, old_rating: old_rating, new_rating: new_rating}),
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return;
    })
    .catch(error => {
        window.alert(error);
        return;
    });
  }

  const theme = createTheme({
    palette: {
      // your other color settings
      customGradient: 'linear-gradient(135deg, #667eea 0%, #e8d5fb 100%)',
    },
    // your other theme settings
  });


  //function for generate drink where there is a fetch post to the backend to get a new drink
  //Function to find a drink with the two attributes liqour and taste when generate drink button is clicked
  const generateDrink = () => {

    console.log(JSON.stringify(drink.drink_ingredients));

   //This function will take drink_ingredients and set a variable equal to vodka, rum, gin, tequila, or whiskey depending on which one is in the array does not have to be the same capitalization
    function getLiquor(drink_ingredients) {
      if (drink_ingredients.includes("Vodka")) {
        return "Vodka";
      } else if (drink_ingredients.includes("Rum")) {
        return "Rum";
      } else if (drink_ingredients.includes("Gin")) {
        return "Gin";
      } else if (drink_ingredients.includes("Tequila")) {
        return "Tequila";
      } else if (drink_ingredients.includes("Whiskey")) {
        return "Whiskey";
      } else {
        return "none";
      }
    }

    fetch(`/drink/generatenewdrink/${getLiquor(JSON.stringify(drink.drink_ingredients))}/${drink.taste}/${drink._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data);
        if(data.error === "No Drink Found"){
          window.alert("No Other Drinks Found with Liquor and Taste Prefrence.");
        }
        //This code will redirect to the drink page which is drink/:id if there is a document with a specific id
        if(!data.error){
          navigate(`/drink/${data._id}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
  <div style={{
      objectFit: 'cover',
      backgroundImage: 'linear-gradient(to right,'+drink.bgcolor1+','+drink.bgcolor2+')',
      width: '100%',
      height: "100%",
      position: 'fixed',
      scale: "1",
      top: 0,
      left: 0,
      zIndex: -1,
    }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop:'10vh'}}>
    <Card className='disable-scrollbars' 
      sx={{ width: '380px', maxHeight: '80vh', overflow: 'auto', marginTop: '10px', borderRadius: 5,
            border: '8px solid #8100c2', boxShadow: '0 0 45px 7px rgba(255, 255, 255, 0.5)', background: theme.palette.customGradient }}>
      <CardHeader
        avatar={
          <Rating name="favorite_icon"
            value={favorited}
            max={1}
            size="large" 
            onChange={(event, newValue) => {
              handleFavoriteChange(newValue);
            }}
          />
        }
        titleTypographyProps={{variant:'h5', fontWeight:'bold'}}
        title={drink.name}
      />
      <CardMedia
        component="img"
        image={drink.picture_url}
        sx={{ width: '94%', minHeight:'438px', maxHeight:'438px', borderRadius:3, alignSelf: 'center', margin:'auto' }}
        alt="drink image"
      />
      <CardActions disableSpacing>
        <Typography sx={{marginLeft:'1em'}}>
          By: {drink.by}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <LocalBarIcon />
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
       <CardContent>
        <Typography><em><b><u>Drink Ingredients:</u></b></em>
        </Typography>
        <Typography sx={{ fontStyle: 'italic' }}>
          {ingredients}
        </Typography>
        <Typography>
          <em><b><u>About:</u></b></em>
        </Typography>
        <Typography>
          {drink.about}
        </Typography>
        <Typography>
          <em><b><u>Overall Rating:</u></b></em>
        </Typography>
        <Rating
          name="overall-rating"
          value={og_rating_value}
          onChange={handleORatingChange}
        />
        <Typography>
          <em><b><u>{drink.taste}-ness Rating:</u></b></em>
        </Typography>
        <Rating
          name="taste-rating"
          value={taste_rating_value}
          onChange={handleTRatingChange}
        />
       </CardContent>
      </Collapse>
    </Card>
    </Box>
    <div style={{ textAlign: 'center' , marginTop: '2vh'}}>
      <Button style={{marginTop: '1vh', backgroundColor: '#8100c2', color: '#FFFFFF'}} 
              variant="contained" 
              className="generate-button"
              onClick={generateDrink}>
        Generate New Drink
      </Button>
    </div>
  </div>
  );
}