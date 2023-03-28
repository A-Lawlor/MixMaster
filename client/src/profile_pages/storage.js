import React from "react";
import { useNavigate } from "react-router";
import "../css/storage.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    width: '100%',
    height: '88.1vh',
    paddingTop: '10vh',
    backgroundImage: 'url(../../Storage.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};


export default function Storage() {
  const navigate = useNavigate();

  function findWithInvClicked() {
      navigate("/");
  }

  function backClicked() {
    navigate("../vault");
  }

  function addClicked() {
    alert("Adding ingredient to your storage");
  }
  function editClicked() {
    alert("Press X to remove ingredient from storage")
  }

 return (  
  <div class="container-fluid" style={divStyle}>
    <div class="row">
      <div class="col-sm mt-1" align="center">
        <button onClick={backClicked} class = "button-84s">Back</button>
      </div>
      <div class="col-sm mt-1" align="center">
      </div>
      <div class="col-sm mt-1" align="center">
        <button onClick={findWithInvClicked} class = "button-84s" id = "button-two-line">Find a Drink to make<br></br> with my Inventory</button>
      </div>
      <div class="row mt-4">
        <div class="col-sm" align="center">
            <h1>Storage List</h1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-sm" align="center">
            <ul class="ingredients_wrapper">
              <ul class="ingredient">Rum</ul>
              <ul class="ingredient">Coke</ul>
              <ul class="ingredient">Whiskey</ul>
              <ul class="ingredient">Citron</ul>
            </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-sm" align="center">
          <div id = "button-div">
            <button onClick={addClicked} class = "button-84s" id = "button-add">Add</button>
            <button onClick={editClicked} class = "button-84s" id = "button-edit">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
 );
}