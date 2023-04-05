import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    backgroundImage: 'url(../../Storage.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#7f00c9',
    width: '100%',
    height: '100%',
    paddingTop: '15vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1
};

const UsersIngredient = (props) => (
  <ul className="ingredient" key={props.index}>{props.ingredient}</ul>
);


export default function Storage() {
  const [users_ingredients, setUsersIngredients] = useState([]);

  // This method fetches the user's ingredients from the database.
  useEffect(() => {
    async function getUsersIngredients() {
      const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/userstorage' : 'http://localhost:5005/userstorage');
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const users_ingredients = await response.json();
      setUsersIngredients(users_ingredients);
    }
    getUsersIngredients();
    return;
  }, [users_ingredients.length]);

  function ingredientsList() {
    return(users_ingredients.map( user => {
      if(user.username == "Dalton") { // REPLACE WITH LOGGED IN USERNAME VARIABLE
        return(
          user.my_ingredients.map( (ingredient, index) => {
            return(
              <UsersIngredient
                ingredient={ingredient}
                key={index}
              />
            )
          })
        )
      }
    }));
  }

  const navigate = useNavigate();

  function findWithInvClicked() {
      navigate("/");
  }
  function backClicked() {
    navigate("/vault");
  }
  function addClicked() {
    navigate("/storageadd");
  }
  function editClicked() {
    navigate("/storageedit");
  }

 return (  
  <div className="container-fluid" style={divStyle}>
    <div className="row">
      <div className="col-12 col-sm-6 mt-3" align="center">
        <button onClick={backClicked} className = "button-84s">Back</button>
      </div>
      <div className="col-12 col-sm-6 mt-3" align="center">
        <button onClick={findWithInvClicked} className = "button-84s button-two-line">Find a Drink to make<br></br> with my Inventory</button>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-sm" align="center">
          <h1 id = "storagelist_header">Storage List</h1>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-sm" align="center">
          <ul className="ingredients_wrapper">
            {ingredientsList()}
          </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-sm" align="center">
        <div id = "button-div">
          <button onClick={addClicked} className = "button-84s button-special">Add</button>
          <button onClick={editClicked} className = "button-84s" id = "button-edit">Edit</button>
        </div>
      </div>
    </div>
  </div>
 );
}