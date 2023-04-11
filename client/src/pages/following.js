import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

import{Container, Row, Col} from 'react-bootstrap';
import {FollowingUserCard} from '../components/FollowingUserCard';

import users from '../data.json';

//testing github integration

function SuggestionFollowers() {


  return (
      <Container>
          <h1>
            Who you can follow!
          </h1>
        <Row>
          {users.map(data => (
            <Col xs={3} className="mt-5 ml-3 mr-3 mb-3">
              <FollowingUserCard />
            </Col>
          ))}
        </Row>
     </Container>
  );
}

export default SuggestionFollowers;