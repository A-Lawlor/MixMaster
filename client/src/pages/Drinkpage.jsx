
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

const theme = createTheme({
  palette: {
    // your other color settings
    customGradient: 'linear-gradient(135deg, #667eea 0%, #e8d5fb 100%)',
  },
  // your other theme settings
});
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("here");
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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Card sx={{ maxWidth: 345, marginTop: '30px', borderRadius: 8,background: theme.palette.customGradient }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Mismosa"
      />
      <CardMedia
        component="img"
        image={drink.picture_url}
        sx={{ width: '100%' }}
        alt="drink image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {drink.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <RecommendIcon />
        </IconButton>
        <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}/>
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
        <Typography paragraph><em><u>Drink Ingredients:</u></em></Typography>
          <Typography paragraph sx={{ fontStyle: 'italic' }}>
          {ingredients}
            </Typography>
            <Typography>
          About:{drink.about}
            </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Box>
    
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