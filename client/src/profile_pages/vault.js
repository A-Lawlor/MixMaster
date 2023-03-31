import React from "react";
import { useNavigate } from "react-router";
import "../css/vault.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    width: '100%',
    height: '88.1vh',
    paddingTop: '40vh',
    backgroundImage: 'url(../../WineCellar.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};


export default function Vault() {
  const navigate = useNavigate();
  
  function clickMe() {
      navigate("../storage");
  }
 return (  
<<<<<<< Updated upstream
  <div class="container-fluid" style={divStyle}>
    <div class="row">
      <div class="col text-center">
        <button onClick={clickMe} class = "button-84v">View Storage</button>
=======
  <div className="container-fluid" style={divStyle}>
    <div className="row">
      <div className="col text-center mt-5">
        <button onClick={toEditProfile} className = "button-84v">Edit Profile</button>
      </div>
    </div>
    <div className="row">
      <div className="col text-center mt-5">
        <button onClick={toFavoritesList} className = "button-84v">Favorites List</button>
      </div>
    </div>
    <div className="row">
      <div className="col text-center mt-5">
        <button onClick={toStorage} className = "button-84v">View Storage</button>
>>>>>>> Stashed changes
      </div>
    </div>
  </div>
 );
}