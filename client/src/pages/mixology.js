import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import YoutubeEmbed from "../components/youtube.js";
import "../css/mixology.css";
import wikihow from "../images/mixology_pictures/WikiHow.png";

function Mixology() {
  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "3vh" }}>
        <Col id="mixology_title" className= "text-center" md={10}>
        <h3 className='storage_header'>Mixology Tutorial</h3>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
        <Col id="intro-text" className= "text-center" md={12}>
          <p>Mixing alcoholic drinks is an art that involves crafting cocktails and other beverages from various liquors, mixers, garnishes, and other ingredients. The goal is to balance and enhance the flavors and qualities of each component while also creating a distinctive and delightful drinking experience. Follow along in these tutorials below so you can learn how to properly craft the perfect cocktail everytime!</p>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "6vh"}}>
      <Col className="text-center" md={12}>
            <NavLink target='_blank' to="https://www.wikihow.com/Make-a-Cocktail" >
              <img id="wikiHow" src={wikihow}/>
            </NavLink>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "6vh", marginBottom: "6vh"}}>
        <Col id="video" md={9}>
            <YoutubeEmbed embedId="tFpqCyJ-nnw" />
        </Col>
      </Row> 
    </Container>
  );
}

export default Mixology;
    