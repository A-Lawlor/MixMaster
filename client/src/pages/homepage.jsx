import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import neon from "../images/videos/neon.mp4"
import "../css/homepage.css"
function Homepage() {
  return (
    <Container fluid>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'fixed',
          scale: "1.1",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src={neon} type="video/mp4" />
      </video>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "30vh" }}>
        <Col className="text-center">
        <Button id="generate-drink-btn" as={NavLink} to="/generatedrink" className="btn btn-primary">Generate Drink</Button>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
        <Col className="text-center">
        <Button id="trending-btn" as={NavLink} to="/trending" className="btn btn-secondary">Trending Drinks</Button>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
        <Col className="text-center"> 
        <Button id="mixology-btn" as={NavLink} to="/mixology" className="btn btn-secondary">Mixology Tutorial</Button>
        </Col>
      </Row>
    </Container>
    
  );
}

export default Homepage;
