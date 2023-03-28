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
  <div class="container-fluid" style={divStyle}>
    <div class="row">
      <div class="col text-center">
        <button onClick={clickMe} class = "button-84v">View Storage</button>
      </div>
    </div>
  </div>
 );
}