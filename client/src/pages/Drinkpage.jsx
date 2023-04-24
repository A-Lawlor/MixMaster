import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Drinkpage() {
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
    <div style={{ textAlign: 'center' , marginTop: '150px'}}>
      <h1>{drink.name}</h1>
      <p>Description: {drink.about}</p>
     {<img src={drink.picture_url} className="drink_picture"  alt="Drink Pic" 
        style={{height: "150px", maxWidth: "150px"}}/>}
      <p>Liquor: {drink.liqour}</p>
      <p>Taste: {drink.taste}</p>
      <p>Rating: {drink.rating}</p>
      <p>Likes: {drink.likes}</p>
      <p>Dislikes: {drink.dislikes}</p>
      <div>
        <h2>Ingredients:</h2>
        {ingredients}
      </div>
      
    </div>
  );
}

/*import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Drinkpage = _ =>{


  const {state} = useLocation();


  return (
    <div>
      <h1>{state.name}</h1>
      <p>Liquor: {state.liqour}</p>
      <p>Taste: {state.taste}</p>
      <p>Rating: {state.rating}</p>
      <p>Likes: {state.likes}</p>
      <p>Dislikes: {state.dislikes}</p>
    </div>
  );
  };

  export default Drinkpage*/ 