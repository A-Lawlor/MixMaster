import React from 'react';
import { ContactForm } from '../components/contactform'
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import './contact.css';

function Contact() {
  return (
    <Container className="wholebox">
      <Row className="titlerow">
        <Col className="titlecolumn" xs={3}>
          <h1>Contact Page</h1>
        </Col>
      </Row>
      <Row className='mycenter'>
        <Col className="composebox d-flex justify-content-center" >
          <div className="contactformbox">
          <ContactForm  />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
