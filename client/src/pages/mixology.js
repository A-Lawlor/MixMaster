import React from 'react';
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import YoutubeEmbed from "../components/youtube.js";

function Mixology() {
  return (
    <Container fluid>
      <Row className="mt-5">
        <Col md={8}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id dictum magna, eget scelerisque mi. Vestibulum dapibus, tellus ac elementum ullamcorper, ipsum sapien interdum magna, quis vehicula magna augue nec ipsum. Vestibulum euismod aliquet lacinia. Vestibulum lobortis pharetra purus, vitae maximus turpis lobortis eget. Vivamus luctus libero ut mi mollis, eu cursus elit commodo. Praesent eu odio est. Fusce eget tellus leo. Donec id arcu metus.
          </p>
        </Col>
        <Col md={4} className="text-center">
          <div className="App">
            <p>Mixology Tutorial</p>
            <YoutubeEmbed embedId="tFpqCyJ-nnw" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Mixology;
    