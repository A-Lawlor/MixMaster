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

 return (  
  <div class="container-fluid" style={divStyle}>
    <div class="row">
      <div class="col-sm mt-1" align="center">
        <button onClick={backClicked} class = "button-84" id = "button-left">Back</button>
      </div>
      <div class="col-sm mt-1" align="center">
      </div>
      <div class="col-sm mt-1" align="center">
        <button onClick={findWithInvClicked} class = "button-84">Find a Drink to make<br></br> with my Inventory</button>
      </div>
      <div class="row mt-4">
        <div class="col-sm" align="center">
            <h1>Storage List</h1>
        </div>
      </div>
    </div>
  </div>
 );
}