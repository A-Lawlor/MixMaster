import React from "react";
import { NavLink } from "react-router-dom";
import "../css/vault.css";
// We import bootstrap to make our application look better.
import{Container, Row, Col, Button} from 'react-bootstrap';
import cellar from "../images/vault_pictures/WineCellar.jpg";

  export default function Vault() {
  return (   
  
  <Container>
       <img
        src={cellar}
        style={{
          objectFit: 'cover',
          opacity: '85%',
          width: '100%',
          height: '100%',
          position: 'fixed',
          scale: "1.1",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        />
    <Row className="justify-content-center align-items-center" style={{ marginTop: "3vh" }}>
      <Col id="vault-title" className= "text-center" md={10}>
        <p>Vault</p>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center" style={{ marginTop: "5vh" }}>
      <Col className="text-center">
        <Button id="vault-btn" as={NavLink} to="/storage" className="btn btn-secondary">Storage</Button>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
      <Col className="text-center">
        <Button id="vault-btn" as={NavLink} to="/following" className="btn btn-secondary">Following</Button>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
      <Col className="text-center"> 
        <Button id="vault-btn" as={NavLink} to="/create" className="btn btn-secondary">Create Drink</Button>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
      <Col className="text-center"> 
        <Button id="vault-btn" as={NavLink} to="/trending" className="btn btn-secondary">Trending Drinks</Button>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
      <Col className="text-center"> 
        <Button id="vault-btn" as={NavLink} to="/editprofile" className="btn btn-secondary">Settings</Button>
      </Col>
    </Row>

  </Container>
 );
}