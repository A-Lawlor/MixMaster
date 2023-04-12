import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import $ from "jquery";

//"/me/:me/user/:user/follow"
const variant_options = ["danger", "success"];

export function UserCard({ data, yourId, followStatus, followStatusColor, followStatusText}) {

  const [color, setColor] = useState(followStatusColor);
  const [following, setFollowing] = useState(followStatus);

  //this code will determine whether to follow or unfollow the set of users in the discover page
  const handleClick = () => {
    if(following) {
      var followCommand = "me/" + yourId + "/user/" + data._id + "/unfollow";
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/' + followCommand : 'http://localhost:5005/' + followCommand);
      fetch(fetch_string, {method:"PATCH"});
      // Swap follow button variables and update w/ jquery
      setColor("success");
      $("#follow-command-button-"+data._id).text("Follow!");
      console.log('you are now UNfollowing this user');
      setFollowing(false);
      return;
    }
    else{
      var followCommand = "me/" + yourId + "/user/" + data._id + "/follow";
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/' + followCommand : 'http://localhost:5005/' + followCommand);
      fetch(fetch_string, {method:"PATCH"});
      // Swap follow button variables and update w/ jquery
      setColor("danger");
      $("#follow-command-button-"+data._id).text("Unfollow");
      console.log('you are now FOLLOWING this user');
      setFollowing(true);
      return;
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
        <Card.Text id={"follow-command-button-appender" + data._id} className="text-secondary">{data.desc}</Card.Text>

        <Button
          onClick={handleClick}
          id={"follow-command-button-" + data._id}
          className="mt-auto font-weight-bold"
          variant={color}
          block="true"
        >
            {followStatusText}
        </Button>
      </Card.Body>
    </Card>
  );
}