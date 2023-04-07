import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
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

  // This method fetches the user's ingredients from the database.
  const [username, setUsername] = useState([]);
  useEffect(() => {
      async function getUsername() {
          
      const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user' : 'http://localhost:5005/user');
      if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
      }
      const username = await response.json();
      setUsername(username);
      if(username.username == "") {
          handleNoLoginShow();
      }
      }
      getUsername();
      return;
  }, [username.length]);

  // This method fetches the user's ingredients from the database.
  const [users_ingredients, setUsersIngredients] = useState([]);
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
      if(user.username == username.username) {
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
  const [show, setShow] = useState(false);
  const handleNoLoginClose = () => {
      setShow(false);
      navigate("/");
  };
  const handleNoLoginShow = () => setShow(true);

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
    <>
      <Modal show={show} onHide={handleNoLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to access the storage page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
      </Modal>
    </>
  </div>
 );
}