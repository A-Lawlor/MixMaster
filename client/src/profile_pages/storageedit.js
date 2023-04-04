import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import $ from "jquery";
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
  <ul className="ingredient" key={props.index} id={props.ingredient+"-listitem"}>{props.ingredient}
    <button className="ingredient-button" onClick={() => {
      props.deleteUserIngredient(props.user, props.ingredient, props.index);
    }}
    >&#x274C;</button>
  </ul>
);


export default function StorageEdit() {
  const [users_ingredients, setUsersIngredients] = useState([]);

  // This method fetches the user's ingredients from the database.
  useEffect(() => {
    async function getUsersIngredients() {
      const response = await fetch(`http://localhost:5005/userstorage/`);
      if(process.env.NODE_ENV === "production"){
          response = await fetch(`https://mix-master.herokuapp.com/userstorage`);
      }
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

  
  async function deleteUserIngredient(_user, _name, index) {
    const deleteIngredient = { 
        name: _name, 
        username: _user.username
    };
    await fetch("http://localhost:5005/userstorage/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteIngredient),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
    })
    .then(() => {
        $("#"+_name+"-listitem").remove();
        const currentUser = users_ingredients.filter((user) => user.username == "Dalton"); // REPLACE WITH LOGGED IN USERNAME VARIABLE
        currentUser[0].my_ingredients.slice(index);
        //const newUsersIngredients = currentUser[0].my_ingredients;
        //setUsersIngredients(newUsersIngredients);
        return;
    })
    .catch(error => {
        window.alert(error);
        return;
    });
  }

  function ingredientsList() {
    return(users_ingredients.map( user => {
      if(user.username == "Dalton") { // REPLACE WITH LOGGED IN USERNAME VARIABLE
        return(
          user.my_ingredients.map( (ingredient, index) => {
            return(
              <UsersIngredient
                user={user}
                ingredient={ingredient}
                deleteUserIngredient={() => deleteUserIngredient(user, ingredient, index)}
                key={index}
              />
            )
          })
        )
      }
    }));
  }

  const navigate = useNavigate();

  function doneClicked() {
    navigate("/storage");
  }

 return (  
  <div className="container-fluid" style={divStyle}>
    <div className="row">
        <div className="col-sm mt-3" align="center">
            <div id = "top_button_placeholder"></div>
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
          <button onClick={doneClicked} className = "button-84s button-special">Done</button>
        </div>
      </div>
    </div>
  </div>
 );
}