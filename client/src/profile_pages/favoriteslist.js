import React from "react";
import { useNavigate } from "react-router";
import {AiFillStar } from "react-icons/ai";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    width: '100%',
    height: '100vh',
    paddingTop: '10vh',
    backgroundImage: 'url(../../Favorites.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#7f00c9'
};


export default function FavoritesList() {
  const navigate = useNavigate();
  function backClicked() {
    navigate("/vault");
  }
 return (  
  <div class="container-fluid" style={divStyle}>
    <div class="row">
      <div class="col-12 mt-3" align="center">
        <button onClick={backClicked} class = "button-84s">Back</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-sm" align="center">
        <div class="drink_wrapper">
          <h2 class="drink_header">Gin & Tonic</h2>
          <span class="favorite_star">&#11088;</span>
          <h3 class="author_header">By: MixMaster</h3>
          <img class="drink_picture" src="../../GinAndTonic.jpg" alt="Profile Picture"/>
        </div>
      </div>
    </div>
  </div>
 );
}