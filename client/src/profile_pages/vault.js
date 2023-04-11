import React from "react";
import { useNavigate } from "react-router";
import "../css/vault.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    backgroundImage: 'url(../../WineCellar.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#7f00c9',
    width: '100%',
    height: '100vh',
    paddingTop: '15vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1
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
      </div>
    </div>
  </div>
 );
}