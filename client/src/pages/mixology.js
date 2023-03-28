import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import YoutubeEmbed from "../components/youtube.js";
import "../css/mixology.css";


function Mixology() {
  return (
    <Container fluid>
      <Row className="mt-5">
      <Col md={1}></Col>
        <Col md={5}>
          <p className="bg-secondary">The art of mixing alcoholic drinks involves creating cocktails and other alcoholic beverages by combining different types of liquors, mixers, garnishes, and other ingredients. The aim is to create balanced and delicious drinks that enhance the flavors and qualities of the individual ingredients while also providing a unique and enjoyable drinking experience.</p>
        </Col>
        <Col md={1}></Col>
        <Col md={4} className="text-center">
          <div className="App">
            <p>Mixology Tutorial</p>
            <YoutubeEmbed embedId="tFpqCyJ-nnw" />
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
      <Col md={1}></Col>
        <Col md={5}>
          <p className="bg-secondary ">Learning how to make alcoholic drinks at home can be a fun and rewarding experience that can save you money, provide a fun social activity, and allow you to experiment with new flavors and ingredients.</p>        
        </Col>
      </Row>
    </Container>
  );
}

export default Mixology;
    