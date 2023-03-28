import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import "../css/about.css"

//Import photos
import anthony from "../images/profile_pictures/Anthony.png"
import daury from "../images/profile_pictures/Daury.png"
import dalton from "../images/profile_pictures/Dalton.png"
import matt from "../images/profile_pictures/Matt.png"


function About() {
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center">
      <Row className="mt-5">
      <Col>
        </Col>
        <Col className="border d-flex flex-column justify-content-center align-items-center bg-secondary">
          <div class="m-1">
            <img src={anthony}/>
            <p class="profile_text">Hello! My name is Anthony Lawlor and I am a  class of 2023 senior at Umass Lowell graduating with a degree in computer science.  I am one of your 4 Mix Masters developers. I am from Danvers Massachuetts and one of my favorite drinks to make at home is a spicy margarita with jalapenos. </p>
          </div>
        </Col>
        <Col>
        </Col>
        <Col className="border border d-flex flex-column justify-content-center align-items-center bg-secondary">
          <div class="m-1">
            <img src={dalton}/>
            <p class="profile_text">Aloha! I’m Dalton and I’m an undergraduate student at UML. I’ll be working for MITRE when I graduate this summer. Stitch and I chose are favorite drink to share with you all to be the Hawaiian Mimosa. It’s a fun easy to make drink for all you orange juice lovers. Sit back, relax, and find your dream drink here!</p>
          </div>
        </Col>
        <Col>
        </Col>
        <Col  className="border border d-flex flex-column justify-content-center align-items-center bg-secondary">
          <div class="m-1">
            <img src={daury}/>
            <p class="profile_text">Hello! My name is Daury Argueta and I am one of your 4 Mix Masters. My family is from Guatemala and we enjoy drinking lots of rum in Guatemala such as Zacapa. I hope you enjoy our Mix Masters page and learn lots about different drinks and get to become a Mix Master your self!</p>
          </div>
        </Col>
        <Col>
        </Col>
        <Col className="border border d-flex flex-column justify-content-center align-items-center bg-secondary">
          <div>
            <img src={matt} />
            <p class="profile_text">Hello! My name is Matthew Tran and I am on your 4 mix Masters. I was born and raised in Northern California but am pursuing my Bachelor’s at Umass Lowell  My favorite drink is the midori sour </p> 
          </div>
        </Col>
           <Col>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
