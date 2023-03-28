import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

function About() {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Col className="text-center">
            <h1>About Page</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
