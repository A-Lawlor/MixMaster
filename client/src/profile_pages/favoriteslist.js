import React from "react";
import { useNavigate } from "react-router";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    backgroundImage: 'url(../../Favorites.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#7f00c9',
    width: '100%',
    height: '100%',
    paddingTop: '15vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1
};


export default function FavoritesList() {
  const navigate = useNavigate();
  function backClicked() {
    navigate("/vault");
  }
 return (  
  <div className="container-fluid" style={divStyle}>
    <div className="row">
      <div className="col-12 mt-3" align="center">
        <button onClick={backClicked} className = "button-84s">Back</button>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-sm" align="center">
        <div className="drink_wrapper">
          <h2 className="drink_header">Gin & Tonic</h2>
          <span className="favorite_star">&#11088;</span>
          <h3 className="author_header">By: MixMaster</h3>
          <img className="drink_picture" src="../../GinAndTonic.jpg" alt="Favorite Drink"/>
        </div>
      </div>
    </div>
  </div>
 );
}