import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

function Homepage() {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Col className="text-center">
          <Button style={{ backgroundColor: "#41C3FA", color: "#fff" }} as={NavLink} to="/generatedrink">Generate Drink</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
