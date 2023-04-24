import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Modal, Button } from "react-bootstrap";
import $ from "jquery";
import "../css/drink.css"; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "bootstrap/dist/css/bootstrap.css";
import "../css/create.css"

//Import for Liqour images
import sweet from "../images/generate_drink_icons/Sweet.png";
import spicy from "../images/generate_drink_icons/Spicy.png";
import sour from "../images/generate_drink_icons/Sour.png";
import bitter from "../images/generate_drink_icons/Bitter.png";
import salty from "../images/generate_drink_icons/Salty.png";


export default function Create() {
 // Ensure user is signed in
 const loggedIn = localStorage.getItem('logged_in');
 const username = localStorage.getItem('username');
 const handleNoLoginClose = () => {
  navigate("/");
 };

 // Set up create drink form
 const [image, setImage] = useState({myFile:""});
 const [form, setForm] = useState({
   picture: "",
   name: "",
   by: username,
   liqour: "Vodka",
   taste: "",
   drink_ingredients: [],
   about: "",
   bgColor1: "#AA00FF",
   bgColor2: "#0099FF"
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This method fetches the ingredients from the database.
 const [ingredient_data, setIngredientData] = useState([]);
 useEffect(() => {
     async function getIngredientData() {
         const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/ingredient'
                                                               : 'http://localhost:5005/ingredient');
         if (!response.ok) {
             const message = `An error occurred: ${response.statusText}`;
             window.alert(message);
             return;
         }
         const ingredient_data = await response.json();
         setIngredientData(ingredient_data.sort((a, b) => (a.name > b.name) ? 1 : -1));
     }
     getIngredientData()       
     return;
 } , [ingredient_data.length]);


 // This function will handle the submission.
 async function onSubmit(event) {
  console.log("Getting into submit drink");
   event.preventDefault();
   //if (form.checkValidity() === false) {
    //event.stopPropagation();
   //} else {
   // When a post request is sent to the create url, we'll add a new drink to the database.
   const newDrink = { ...form };
   //this will print out the object attributes in the console
    console.log(newDrink);
   await fetch("/drink/add/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDrink),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      setForm({
        picture: "",
        name: "",
        by: username,
        taste: "",
        drink_ingredients: [],
        about: "",
        bgColor1: "",
        bgColor2: "",
      });
      window.location.href = `/drink/${response.json()._id}`;
    })
    .catch((error) => {
      window.alert(error);
    });
  }  


 // Image code
 async function fileSelectedHandler(e) {
  const file = e.target.files[0];
  const base64 = await convertToBase64(file);
  setImage({...image, myFile:base64});
  updateForm({ picture: base64 });
}
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => {
      reject(error);
    };
  })
}

// Add ingredients code
  const [showSearch, setShowSearch] = useState(false);
  const [searchedIngredientList, setSearchedIngredientList] = useState([]);
  const [formIngredientList, setFormIngredientList] = useState([]);
  const handleSearchViaAddClose = () => {
    setSearchedIngredientList([]);
    setShowSearch(false);
  };
  const handleSearchViaAddShow = () => setShowSearch(true);

  async function searchClicked() {
    handleSearchViaAddShow();
  }

  // Call upon submission, 
  async function updateFormIngredientArray() {
    var ing_amount;
    var drink_OBJ;
    var drink_ingredients_input = [];
    formIngredientList.map((ingredient) => {
      ing_amount = $("#create_drink_form_list_item_amount_"+ingredient.replace(/ /g,"_")).val();
      //console.log("Amount of "+ingredient+ ": " +ing_amount);
      drink_OBJ = {name: ingredient, amount: ing_amount};
      drink_ingredients_input.push(drink_OBJ);
    });
    updateForm({ drink_ingredients: drink_ingredients_input });
  }

  // Call when Add All button is clicked inside of add drink ingredients modal
  function addAllClicked() {
    searchedIngredientList.sort()
    var li_item;
    var li_amount_item;
    searchedIngredientList.map((ingredient) => {
      if(!formIngredientList.includes(ingredient)) {
        // Ingredient name list item
        li_item = $("<li>Amount of <span style='color:green'>"+ingredient+"</span>:</li>");
        li_item.attr('id', 'create_drink_form_list_item_'+ingredient.replace(/ /g,"_"));
        li_item.attr('class', 'create_drink_form_list_item');
        // Ingredient amount list item
        li_amount_item = $('<input>');
        li_amount_item.attr('type', 'text');
        li_amount_item.attr('id', 'create_drink_form_list_item_amount_'+ingredient.replace(/ /g,"_"));
        li_amount_item.attr('class', 'create_drink_form_list_item_amount');
        li_amount_item.on('change', function() {
          updateFormIngredientArray();
        });
        // Push to list displayed on form and update drink ingredient array
        $("#create_searched_ingredient_list_form_display").append(li_item);
        $(li_item).append(li_amount_item);
        formIngredientList.push(ingredient);
        setFormIngredientList(formIngredientList.sort());
      }
    });
    updateFormIngredientArray();
    handleSearchViaAddClose();
  }


  // Call when user selects an ingredient from the autocomplete search componenet 
  function addToSearchedIngList(ingredient_to_list) {
    if(ingredient_to_list === null)
      return;
    if(searchedIngredientList.includes(ingredient_to_list))
      return;
    if(formIngredientList.includes(ingredient_to_list))
      return;
    if((formIngredientList.length + searchedIngredientList.length) > 9)
      return;
    searchedIngredientList.push(ingredient_to_list);
    setSearchedIngredientList(searchedIngredientList);
    $("#searched_storage_ingredients").append("<li>"+ingredient_to_list+"</li>");
  }

 // This following section will display the form that takes the input from the user.
 return (
  <div className="d-flex justify-content-center align-items-center vh-100">
   <div className="create_wrapper container-fluid border" style={{width:"60vw"}}>
     <h3 className="text-center">Create New Drink</h3>
     <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Drink Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Drink Name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Picture of Drink</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            id="image_input"
            onChange={(e) => fileSelectedHandler(e)}
          />
          {image.myFile==="" || image.myFile===null?"": <img src={image.myFile} className="drink_picture"  
            style={{marginTop: '10px'}} alt="Drink Pic Preview"/>}
        </div>
        <br></br>
        <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionTaste"
             id="positionSweet"
             value="Sweet"
             checked={form.taste === "Sweet"}
             onChange={(e) => updateForm({ taste: e.target.value })}
           />
           <img src={sweet} width="30" />
           <label htmlFor="positionIntern" className="form-check-label">Sweet</label>
         </div>
         <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionTaste"
              id="positionSpicy"
              value="Spicy"
              checked={form.taste === "Spicy"}
              onChange={(e) => updateForm({ taste: e.target.value })}
            />
            <img src={spicy} width="30" />
            <label htmlFor="positionJunior" className="form-check-label">Spicy</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionTaste"
              id="positionSour"
              value="Sour"
              checked={form.taste === "Sour"}
              onChange={(e) => updateForm({ taste: e.target.value })}
            />
            <img src={sour} width="30" />
            <label htmlFor="positionJunior" className="form-check-label">Sour</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionTaste"
              id="positionBitter"
              value="Bitter"
              checked={form.taste === "Bitter"}
              onChange={(e) => updateForm({ taste: e.target.value })}
            />
            <img src={bitter} width="30" />
            <label htmlFor="positionJunior" className="form-check-label">Bitter</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionTaste"
              id="positionSalty"
              value="Salty"
              checked={form.taste === "Salty"}
              onChange={(e) => updateForm({ taste: e.target.value })}
            />
              <img src={salty} width="30" />
              <label htmlFor="positionJunior" className="form-check-label">Salty</label>
          </div>
        </div>
        <br></br>
        <div className="form-group d-md-flex justify-content-center">
         <label htmlFor="ingredients">Ingredients: </label>
         <Button id="create_search_button" onClick={searchClicked} className = "btn">Add</Button>
         <ul id = "create_searched_ingredient_list_form_display"></ul>
       </div>
       <div className="form-group">
         <label htmlFor="about">Description</label>
         <input
           type="text"
           className="form-control"
           id="about"
           placeholder="Enter description of drink"
           value={form.about}
           onChange={(e) => updateForm({ about: e.target.value })}
         />
       </div>
       <br></br>
       <div className="form-group d-md-flex justify-content-center">
        <div className="me-5">
            <label htmlFor="bg-color1">Background Color 1</label>
            <input type="color" id="bg-color1" className="form-control" name="bg-color1" 
              value={form.bgColor1} onChange={e => updateForm({bgColor1: e.target.value})} style={{width:'10em'}}/>
        </div>
        <div>
            <label htmlFor="bg-color2">Background Color 2</label>
            <input type="color" id="bg-color2" className="form-control" name="bg-color2" 
              value={form.bgColor2} onChange={e => updateForm({bgColor2: e.target.value})} style={{width:'10em'}}/>
        </div>
      </div>

       <br></br>
       <div className="d-md-flex justify-content-center form-group">
         <button
           type="submit"
           className="btn btn-primary" 
           id="create_drink_button"
         >Create Drink
          </button>
       </div>
     </form>
     </div>
     <>
      <Modal show={loggedIn === null} onHide={handleNoLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to access the storage page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
      </Modal>
     </>
     <>
      <Modal show={showSearch} onHide={handleSearchViaAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ingredients By Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Using the search bar below you may add the ingredients for your drink to a list.
            <br></br>Upon clicking "Add All", all the ingredients in the list will be added to the drink recipe!
            <br></br>Note: You cannot add already selected ingredients OR more than 10 ingredients
            <br></br>
            <br></br>
            <Autocomplete
                onChange={(event, newValue) => {
                    addToSearchedIngList(newValue);
                }}
                id="ingredient-add-search-box"
                options={ingredient_data.map(a => a.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ingredients" />}
            />
            <br></br>
            <ul id="searched_storage_ingredients">
            </ul>
            <br></br>
            <Button id="add_all_button" onClick={addAllClicked}>Add All</Button>
        </Modal.Body>
      </Modal>
     </>
   </div>
 );
}