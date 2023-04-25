import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import "../css/storage.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import{Container, Row, Col, Button} from 'react-bootstrap';
import storage from "../images/storage_pictures/Storage.jpg";


const UsersIngredient = (props) => (
  <ul className="ingredient-storage-li" key={props.index}>{props.ingredient}</ul>
);


export default function Storage() {

  // This method fetches the user's info used to query db from the client storage.
  const loggedIn = localStorage.getItem('logged_in');
  const username = localStorage.getItem('username');
  // Ensure user is signed in
  const navigate = useNavigate();
  const handleNoLoginClose = () => {
      navigate("/");
  };

  // navigate functions
  function findWithInvClicked() {
    var ingredientNamesArray = drinks.map(function (drinkObj) {
      return drinkObj.drink_ingredients.map(function (nameObj) {
        return nameObj.name;
      });
    });
    // declare variables to use in drink to user ingredient percent finding
    var drink_to_user_ing_percent = 0.0;
    var ordered_drinks = [];
    var intersection = [];
    // find percent of ingredients in a drink that exist in a user's inventory
    ingredientNamesArray.map(function(drinkIngArray, index){
      intersection = drinkIngArray.filter(element => users_ingredients.includes(element));
      drink_to_user_ing_percent = intersection.length / drinkIngArray.length;
      ordered_drinks.push({_id: drinks[index]._id, percent_weight: drink_to_user_ing_percent.toFixed(2)});
    });
    ordered_drinks.sort(function(a, b) {
      return parseFloat(b.percent_weight) - parseFloat(a.percent_weight);
    });
    localStorage.setItem('user_drink_ing_array', JSON.stringify(ordered_drinks));
    navigate("/listbyingredients")
  }
  function addClicked() {
    navigate("/storageadd");
  }
  function editClicked() {
    navigate("/storageedit");
  }

   // This method fetches the user's ingredients from the database.
   const [drinks, setDrinks] = useState([]);
   useEffect(() => {
     async function getDrinks() {
       const fetch_string = process.env.NODE_ENV === 'production' ?
                            'https://mix-master.herokuapp.com/drink/get_ids_and_ings/' : 
                            'http://localhost:5005/drink/get_ids_and_ings/';
       const response = await fetch(fetch_string);
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
       const drinks = await response.json();
       setDrinks(drinks);
     }
     getDrinks();
     return;
   }, [drinks.length]);

  // This method fetches the user's ingredients from the database.
  const [users_ingredients, setUsersIngredients] = useState([]);
  useEffect(() => {
    async function getUsersIngredients() {
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
      setUsersIngredients(users_info.ingredient_storage.sort());
    }
    getUsersIngredients();
    return;
  }, [users_ingredients.length]);

  function ingredientsList() {
    return(users_ingredients.map( (ingredient, index) => {
      return(
        <UsersIngredient
          ingredient={ingredient}
          key={index}
        />
      )
    }));
  }

 return (  
  <Container>
    <img
      src={storage}
      style={{
      objectFit: 'cover',
      opacity: '70%',
      width: '100%',
      height: "100%",
      position: 'fixed',
      scale: "1",
      top: 0,
      left: 0,
      zIndex: -1,
      overflow: "auto"
    }}
    />
     <Row className="justify-content-center align-items-center" style={{ marginTop: "4vh" }}>
      <Col id="storage_title" className= "text-center" xs={10}>
      <h3 className='storage_header'>Storage List</h3>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center">
      <Col id="ingredients_wrapper" xs={12}>
          <ul id="storage_ingredients" className="ingredients_wrapper">
            {ingredientsList()}
          </ul>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center">
      <Col id="storage_buttons" xs={12} className="pb-3">
        <Button id="add_button" onClick={addClicked} className = "btn mt-2">Add</Button>
        <Button id="generate_button" onClick={findWithInvClicked} className = "btn mt-2">Find Drink w/ My Ingredients</Button>
        <Button id="edit_button" onClick={editClicked} className = "btn mt-2">Edit</Button>
      </Col>
    </Row>
    <>
      <Modal show={loggedIn === null} onHide={handleNoLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to access the storage page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
      </Modal>
    </>
  </Container>
 );
}