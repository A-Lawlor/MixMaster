import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";

//"/me/:me/user/:user/follow"

export function UserCard({ data, yourId, followStatus, followStatusColor, followStatusText}) {

  const [following, setFollowing] = useState(false);

  //this code will determine whether to follow or unfollow the set of users in the discover page
  const handleClick = () => {
    //setFollowing(!following);
    //setFollow();
    if(followStatus){
      //setFollow();
      console.log('you are following this user');
      console.log('you are NOW UNfollowing this user');
      var followCommand = "me/"+yourId + "/user/"+ data._id + "/unfollow";
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/'+followCommand : 'http://localhost:5005/'+ followCommand);
      fetch(fetch_string, {method:"PATCH"});
    }
    else{
      console.log('you are NOT following this user');
      console.log('you are NOW FOLLOWING this user');
      var followCommand = "me/"+yourId + "/user/"+ data._id + "/follow";
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/'+followCommand : 'http://localhost:5005/'+ followCommand);
      fetch(fetch_string, {method:"PATCH"});
    }
  };

  return (
    <Card className="h-100 shadow-sm bg-white rounded">
      <Card.Img variant="top" src={data.image} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex mb-2 justify-content-between">
          <Card.Title className="mb-0 font-weight-bold">{data.name}</Card.Title>
          <Badge pill className="mb-1" bg="info" variant="warning">
            {data.followers}
          </Badge>
        </div>
        <Card.Text className="text-secondary">{data.desc}</Card.Text>

        <Button
          onClick={handleClick}
          className="mt-auto font-weight-bold"
          variant={followStatusColor}
          block
        >
          {followStatusText}
        </Button>
      </Card.Body>
    </Card>
  );
}