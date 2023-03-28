import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";

export function UserCard({ data, setFollow }) {
  const [following, setFollowing] = useState(false);

  const handleClick = () => {
    setFollowing(!following);
    setFollow();
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
          variant={following ? "danger" : "success"}
          block
        >
          {following ? "unfollow" : "follow!"}
        </Button>
      </Card.Body>
    </Card>
  );
}