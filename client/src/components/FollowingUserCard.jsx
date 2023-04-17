import React from 'react'
import { Card, Badge} from "react-bootstrap";


export function FollowingUserCard() {
  return (
    <Card className="h-100 shadow-sm bg-white rounded">
    <Card.Img variant="top"/>
    <Card.Body className="d-flex flex-column">
      <div className="d-flex mb-2 justify-content-between">
        <Card.Title className="mb-0 font-weight-bold">User Name</Card.Title>
        <Badge pill className="mb-1" bg="info" variant="warning">
          #Followers
        </Badge>
      </div>
      <Card.Text className="text-secondary">OH I LOVE DRINKING</Card.Text>
    </Card.Body>
  </Card>
  )
}
