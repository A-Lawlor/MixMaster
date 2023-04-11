import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';

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

  const[follow,setFollow]=useState(false);
  
  function displayConfirmation()
  {
    setFollow(true);

    setTimeout(()=> {
      setFollow(false);
    }, 3000);
  }

  // This method fetches the user's username from the server.
  const [username, setUsername] = useState([]);
  useEffect(() => {
      async function getUsername() {

      const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user/getusername' : 'http://localhost:5005/user/getusername');
      if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
      }
      const username = await response.json();
      setUsername(username);
      }
      getUsername();
      return;
  }, [username.length]);

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
      if(user.name === username.username) {
        var yourId = user._id;
          return all_users.map((checkUser) => {
              if(user.following.includes(checkUser._id)) {
                console.log('ENTERING IF');
                  return (
                  <FollowingUserCard
                  checkUser={checkUser}
                  key={checkUser._id}
                  yourId = {yourId}
                  />);
              }
              else {
                console.log('ENTERING ELSE');
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

  return (
      <Container>
          <h1>
            Who you can follow!
          </h1>
        {follow && <Confirmation toggle={setFollow} />}
        <Row>
          {followlist()}
        </Row>
     </Container>
  );
}