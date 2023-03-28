import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

export function Confirmation() {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const now = new Date();
  const time = now.getHours() + ":" + now.getMinutes();

  return (
    <Row className="justify-content-center">
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">MixMaster</strong>
            <small>{ time }</small>
          </Toast.Header>
          <Toast.Body>You have followed a new user!</Toast.Body>
        </Toast>
    </Row>
  );
}
