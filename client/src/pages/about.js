import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from "../css/about.css"

//Profile Photos
import anthony from "../images/profile_pictures/Anthony.png";
import daury from "../images/profile_pictures/Daury.png";
import dalton from "../images/profile_pictures/Dalton.png";
import matt from "../images/profile_pictures/Matt.png";

//Social Media Icons
import github from "../images/socialmedia_icons/Github.png";
import linkedin from "../images/socialmedia_icons/LinkedIn.png";


function About() {
  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "3vh" }}>
        <Col id="about_title" className= "text-center" md={10}>
          <p>About Us</p>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center" style={{ marginTop: "2vh", marginBottom: "5vh"}}>
        <Col id="anthony_profile" className= "text-center" md={3}>
          <img class="about_image" src={anthony}/>
          <Row className="justify-content-center align-items-center">
            <Col className= "text-center" md={3}>
              <NavLink target='_blank' to="https://github.com/A-Lawlor">
                <img class="social_icons" src={github}/>
              </NavLink>
            </Col>
            <Col className= "text-center" md={3}>
              <NavLink target='_blank' to="https://www.linkedin.com/in/anthony-lawlor/">
                <img class="social_icons" src={linkedin}/>
              </NavLink>
            </Col>
          </Row>
          <p class="about_text">Hello! My name is Anthony Lawlor and I am a  class of 2023 senior at Umass Lowell graduating with a degree in computer science and will be working at Raytheon.  I am one of your 4 Mix Masters developers. I am from Danvers Massachuetts and one of my favorite drinks to make at home is a spicy margarita with jalapenos. </p>
        </Col>
        <Col id="dalton_profile" className= "text-center" md={3}>
          <img class="about_image" src={dalton}/>
          <Row className="justify-content-center align-items-center">
            <Col className= "text-center" md={3}>
              <NavLink target='_blank' to="https://github.com/daltonlee1010">
                <img class="social_icons" src={github}/>
              </NavLink>
            </Col>
            <Col className= "text-center" md={3}>
              <NavLink target='_blank' to="https://www.linkedin.com/in/dalton-lee-b545681b4/">
                <img class="social_icons" src={linkedin}/>
              </NavLink>
            </Col>
          </Row>
          <p class="about_text">Aloha! I’m Dalton and I’m an undergraduate student at UML. I’ll be working for MITRE when I graduate this summer. Stitch and I chose our favorite drink to share with you all to be the Hawaiian Mimosa. It’s a fun easy to make drink for all you orange juice lovers. Sit back, relax, and find your dream drink here! </p>
        </Col>
        <Col id="daury_profile" className= "text-center" md={3}>
          <img class="about_image" src={daury}/>
          <Row className="justify-content-center align-items-center">
            <Col className= "text-center" md={3}>
              <NavLink target='_blank'>
                <img class="social_icons" src={github}/>
              </NavLink>
            </Col>
            <Col className= "text-center" md={3}>
              <NavLink target='_blank'>
                <img class="social_icons" src={linkedin}/>
              </NavLink>
            </Col>
          </Row>
          <p class="about_text">Hello! My name is Daury Argueta and I am one of your 4 Mix Masters. My family is from Guatemala and we enjoy drinking lots of rum in Guatemala such as Zacapa. I hope you enjoy our Mix Masters page and learn lots about different drinks and get to become a Mix Master your self! </p>
        </Col>
        <Col id="matt_profile" className= "text-center" md={3}>
          <img class="about_image" src={matt}/>
          <Row className="justify-content-center align-items-center">
            <Col className= "text-center" md={3}>
              <NavLink target='_blank'>
                <img class="social_icons" src={github}/>
              </NavLink>
            </Col>
            <Col className= "text-center" md={3}>
              <NavLink target='_blank'>
                <img class="social_icons" src={linkedin}/>
              </NavLink>
            </Col>
          </Row>
          <p class="about_text">Hello! My name is Matthew Tran and I am on your 4 mix Masters. I was born and raised in Northern California. Currently I am a pursing a undergraduate degree at the University of Massachuetts Lowell. I enojoy a variet of mixed drinks but my favorite drink is a midori sour. </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
