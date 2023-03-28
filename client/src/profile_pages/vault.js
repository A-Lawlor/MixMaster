import React from "react";
import { useNavigate } from "react-router";
import "../css/vault.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    width: '100%',
    height: '100vh',
    paddingTop: '10vh',
    backgroundImage: 'url(../../WineCellar.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#7f00c9'
};


export default function Vault() {
  const navigate = useNavigate();
  
  function toStorage() {
      navigate("/storage");
  }
  function toEditProfile() {
      navigate("/editprofile");
  }
  function toFavoritesList() {
      navigate("/favoriteslist");
  }
 return (  
  <div class="container-fluid" style={divStyle}>
    <div class="row">
      <div class="col text-center mt-5">
        <button onClick={toEditProfile} class = "button-84v">Edit Profile</button>
      </div>
    </div>
    <div class="row">
      <div class="col text-center mt-5">
        <button onClick={toFavoritesList} class = "button-84v">Favorites List</button>
      </div>
    </div>
    <div class="row">
      <div class="col text-center mt-5">
        <button onClick={toStorage} class = "button-84v">View Storage</button>
      </div>
    </div>
  </div>
 );
}