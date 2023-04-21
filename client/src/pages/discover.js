import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from "react-bootstrap";

import{Container, Row, Col} from 'react-bootstrap';
import {UserCard} from '../components/UserCard';
import {Confirmation} from '../components/Confirmation';

//testing github integration

const NotFollowingUserCard = (props) => (
  <Col xs={3} className="mt-5 ml-3 mr-3 mb-3" key={props.checkUser._id}>
  <UserCard data={props.checkUser} yourId={props.yourId} followStatus={false} followStatusColor={"success"} followStatusText={"Follow!"}/>
  </Col>
);

const FollowingUserCard = (props) => (
  <Col xs={3} className="mt-5 ml-3 mr-3 mb-3" key={props.checkUser._id}>
  <UserCard data={props.checkUser} yourId={props.yourId} followStatus={true} followStatusColor={"danger"} followStatusText={"Unfollow"}/>
  </Col>
);

export default function Discover() {

  const[follow, setFollow]=useState(false);

  // This method fetches the user's ingredients from the client storage.
  const loggedIn = localStorage.getItem('logged_in');
  const username = localStorage.getItem('username');
  if(loggedIn === true) {
    handleNoLoginShow();
  }
  if(username === "") {
    handleNoLoginShow();
  }

  //starting process of getting users from database.
  const [all_users, setAllUsers] = useState([]);
  useEffect(() => {
    async function getAllUsers() {
      const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user' : 'http://localhost:5005/user');
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const all_users = await response.json();
      setAllUsers(all_users);
    }
    getAllUsers()     
    return;
  } , [all_users.length]);

  function followlist(){
    return(all_users.map( user => {
      if(user.name === username) {
        var yourId = user._id;
          return all_users.map((checkUser) => {
              if(user.following.includes(checkUser._id)) {
                  return (
                  <FollowingUserCard
                  checkUser={checkUser}
                  key={checkUser._id}
                  yourId = {yourId}
                  />);
              }
              else {
                  return (
                  <NotFollowingUserCard
                  checkUser={checkUser}
                  key={checkUser._id}
                  yourId = {yourId}
                  />);
              }
          });
      }
  }));
  }

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleNoLoginClose = () => {
      setShow(false);
      navigate("/");
  };
  const handleNoLoginShow = () => setShow(true);

  return (
      <Container>
          <h1>
            Who you can follow!
          </h1>
        {follow && <Confirmation toggle={setFollow} />}
        <Row>
          {followlist()}
        </Row>
        <>
          <Modal show={show} onHide={handleNoLoginClose}>
            <Modal.Header closeButton>
              <Modal.Title>ERROR</Modal.Title>
            </Modal.Header>
            <Modal.Body>You must be logged in to access the storage page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
          </Modal>
        </>
     </Container>
  );
}