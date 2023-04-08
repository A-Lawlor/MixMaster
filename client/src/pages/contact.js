import React from 'react';
import { ContactForm } from '../components/contactform'
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

function Contact() {
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center align-items-center" >
        <Col xs={12} md={8} className="text-center">
          <h1>Contact Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <ContactForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
