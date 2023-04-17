import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import{Container, Row, Col, Button} from 'react-bootstrap';
import storage from "../images/storage_pictures/Storage.jpg";

const divStyle = {
    backgroundImage: 'url(../../Storage.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    paddingTop: '15vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1
};

const UnownedIngredient = (props) => (
    <ul className="ingredient" key={props.ingredient._id} id={props.ingredient._id}>{props.ingredient.name}
        <button className="ingredient-button" id={props.ingredient._id+"-button"} onClick={() => {
            props.addUserIngredient(props.ingredient.name, props.ingredient._id);
        }}
        >&#x2795;</button>
    </ul>
);

const OwnedIngredient = (props) => (
    <ul className="ingredient" key={props.ingredient._id}>{props.ingredient.name}
        <span className="ingredient-button">&#x2714;</span>
    </ul>
);

export default function StorageAdd() {

    // This method fetches the user's info used to query db from the client storage.
    const loggedIn = localStorage.getItem('logged_in');
    const username = localStorage.getItem('username');
    if(loggedIn === true) {
        handleNoLoginShow();
    }
    if(username === "") {
        handleNoLoginShow();
    }

    // This method fetches the ingredients from the database.
    const [ingredient_data, setIngredientData] = useState([]);
    useEffect(() => {
        async function getIngredientData() {
            const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/ingredient' : 'http://localhost:5005/ingredient');
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const ingredient_data = await response.json();
            setIngredientData(ingredient_data);
        }
        getIngredientData()       
        return;
    } , [ingredient_data.length]);


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
            console.log(users_info.ingredient_storage);
            setUsersIngredients(users_info.ingredient_storage);
        }
        getUsersIngredients();
        return;
    }, [users_ingredients.length]);


    async function addUserIngredient(ingredient, id) {
        const addIngredient = { 
            name: ingredient.name
        };
        let fetch_string = (process.env.NODE_ENV === 'production' ?
                            'https://mix-master.herokuapp.com/user/add_ingredient_to_storage/'+username : 
                            'http://localhost:5005/user/add_ingredient_to_storage/'+username);
        await fetch(fetch_string, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addIngredient),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
        })
        .then(() => {
            $("#"+id+"-button").remove();
            $("#"+id).append("<span>&#x2714;</span>");
            $("span").addClass("ingredient-button");
            return;
        })
        .catch(error => {
            window.alert(error);
            return;
        });        
    }

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleNoLoginClose = () => {
        setShow(false);
        navigate("/");
    };
    const handleNoLoginShow = () => setShow(true);

    function doneClicked() {
        navigate("/storage");
    }

    function ingredientsList() {
        return ingredient_data.map((ingredient) => {
            if(users_ingredients.includes(ingredient.name)) {
                return (
                <OwnedIngredient
                    ingredient={ingredient}
                    key={ingredient._id}
                />);
            }
            else {
                return (
                <UnownedIngredient
                    ingredient={ingredient}
                    addUserIngredient={() => addUserIngredient(ingredient, ingredient._id)}
                    key={ingredient._id}
                />);
            }
        });
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
        }}
        />
         <Row className="justify-content-center align-items-center" style={{ marginTop: "4vh" }}>
          <Col id="storage_title" className= "text-center" xs={10}>
            <p>Add Ingredients</p>
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
            <Button id="done_button" onClick={doneClicked} className = "btn mt-2">Done</Button>
          </Col>
        </Row>
    <>
      <Modal show={show} onHide={handleNoLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to access the storage page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
      </Modal>
    </>
  </Container>
 );
}
