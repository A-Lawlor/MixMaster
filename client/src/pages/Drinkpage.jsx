
/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const [drink, setDrink] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDrink = async () => {
      const res = await fetch(`/drink/${id}`);
      const data = await res.json();
      console.log("data:", data);
      setDrink(data);
    };
    fetchDrink();
  }, [id]);

  if (!drink) return <div>Loading...</div>;
  console.log(drink);
  const ingredients = drink.drink_ingredients.map((ingredient) => (
    <p key={ingredient.name}>
      {ingredient.name}: {ingredient.amount}
    </p>
  ));

  const theme = createTheme({
    palette: {
      // your other color settings
      customGradient: 'linear-gradient(135deg, #667eea 0%, #e8d5fb 100%)',
    },
    // your other theme settings
  });

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
      sx={{ width: '380px', maxHeight: '80vh', overflow: 'auto', marginTop: '30px', borderRadius: 5,
            border: '8px solid #8100c2', boxShadow: '0 0 45px 7px rgba(255, 255, 255, 0.5)', background: theme.palette.customGradient }}>
      <CardHeader
        avatar={
          <Rating name="size-large" defaultValue={null} max={1} size="large" />
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
        <Typography 
          paragraph><em><b><u>Drink Ingredients:</u></b></em>
        </Typography>
        <Typography paragraph sx={{ fontStyle: 'italic' }}>
          {ingredients}
        </Typography>
        <Typography
          ><em><b><u>About:</u></b></em>
        </Typography>
        <Typography paragraph>
          {drink.about}
        </Typography>
        
        <Typography>
          <em><b><u>Overall Rating:</u></b></em>
        </Typography>
        <Rating
          name="overall-rating"
          value={value}
          onChange={handleRatingChange}
        />
        
        <Typography>
          <em><b><u>{drink.taste}-ness Rating:</u></b></em>
        </Typography>
        <Rating
          name="taste-rating"
          value={value}
          onChange={handleRatingChange}
          />
       </CardContent>
      </Collapse>
    </Card>
    </Box>
  </div>
    
    /*
    <div style={{ textAlign: 'center' , marginTop: '150px'}}>
      <h1>{drink.name}</h1>
      <p>Description: {drink.about}</p>
     {<img src={drink.picture_url} className="drink_picture"  alt="Drink Pic" 
        style={{height: "150px", maxWidth: "150px"}}/>}
      <p>Posted By: {drink.by}</p>
      <p>Taste: {drink.taste}</p>
      <p>Rating: {drink.rating}</p>
      <p>Likes: {drink.likes}</p>
      <p>Dislikes: {drink.dislikes}</p>
      <div>
        <h2>Ingredients:</h2>
        {ingredients}
      </div>
      
    </div>
    */
  );
}