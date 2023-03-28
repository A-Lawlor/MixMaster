import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    width: '100%',
    height: '100vh',
    paddingTop: '10vh',
    backgroundImage: 'url(../../Storage.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};


export default function StorageAdd() {

    const [ingredient_data, setIngredientData] = useState([]);
    // This method fetches the records from the database.
    useEffect(() => {
    async function getIngredientData() {  
        const response = await fetch(`http://localhost:5005/ingredient`);
        console.log(response);

        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
        
        const ingredient_data = await response.json();
        console.log(ingredient_data);
        setIngredientData(ingredient_data);
    }
   
    getIngredientData()       
 
    return;
 } , [ingredient_data.length]);

  const navigate = useNavigate();
  function doneClicked() {
    navigate("/storage");
  }

  function editClicked() {
    alert("Press X to remove ingredient from storage")
  }

 return (  
  <div class="container-fluid" style={divStyle}>
    <div class="row">
      <div class="col-sm mt-3" align="center">
        <div id = "top_button_placeholder"></div>
      </div>
    </div>
    <div class="row mt-5">
        <div class="col-sm" align="center">
            <h1 id = "storagelist_header">Storage List</h1>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-sm" align="center">
            <ul class="ingredients_wrapper">
                {ingredient_data.map( i => {
                    return(
                        <ul class="ingredient">{i.name}</ul>
                    )
                })}
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-sm" align="center">
            <div id = "button-div">
            <button onClick={doneClicked} class = "button-84s button-special" id = "button-done">Done</button>
            <button onClick={editClicked} class = "button-84s" id = "button-edit">Edit</button>
            </div>
        </div>
    </div>
  </div>
 );
}