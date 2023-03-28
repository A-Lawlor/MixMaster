import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';

import{Container, Row, Col} from 'react-bootstrap';
import {UserCard} from '../components/UserCard';
import {Confirmation} from '../components/Confirmation';

import users from '../data.json';

function SuggestionFollowers() {

  const[follow,setFollow]=useState(false);
  
  function displayConfirmation()
  {
    setFollow(true);

    setTimeout(()=> {
      setFollow(false);
    }, 3000);
  }


  return (
      <Container>
        {follow && <Confirmation toggle={setFollow} />}
        <Row>
          {users.map(data => (
            <Col xs={3} className="mt-5 ml-3 mr-3 mb-3" key={'${data.id}'}>
              <UserCard data={data} setFollow={displayConfirmation}/>
            </Col>
          ))}
        </Row>
     </Container>
  );
}

export default SuggestionFollowers;