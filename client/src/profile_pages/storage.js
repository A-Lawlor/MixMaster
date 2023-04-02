import React from "react";
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
    backgroundSize: 'cover',
    backgroundColor: '#7f00c9'
};


export default function Storage() {
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
    alert("Press X to remove ingredient from storage");
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
            <ul className="ingredient">Rum</ul>
            <ul className="ingredient">Coke</ul>
            <ul className="ingredient">Whiskey</ul>
            <ul className="ingredient">Citron</ul>
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