import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

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

    // This method fetches the user's username from the server.
    const [username, setUsername] = useState([]);
    useEffect(() => {
        async function getUsername() {
            
        const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user/getusername' : 'http://localhost:5005/user/getusername');
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const username = await response.json();
        setUsername(username);
        if(username.username === "") {
            handleNoLoginShow();
        }
        }
        getUsername();
        return;
    }, [username.length]);

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


    async function addUserIngredient(ingredient, id) {
        let _username = username.username;

        const addIngredient = { 
            name: ingredient.name,
            username: _username
        };
        let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/userstorage/add' : 'http://localhost:5005/userstorage/add');
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
        return(users_ingredients.map( user => {
            if(user.username === username.username) {
                return ingredient_data.map((ingredient) => {
                    if(user.my_ingredients.includes(ingredient.name)) {
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
        }));
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
            <button onClick={doneClicked} className = "button-84s button-special" id = "button-done">Done</button>
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
