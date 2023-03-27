import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Modal, Form } from "react-bootstrap";
import "../css/navbar.css"
export default function Navbar() {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const formRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    formRef.current.reset();
  };

  const handleShow = () => setShow(true);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoggedIn(true);
      setUsername(form.elements.username.value);
      handleClose();
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  return (
  <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ height: "60px", backgroundColor: "rgba(51, 51, 51, 0.9)" }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={{paddingRight: '0'}}>
          <img src="../../MixMaster.png" alt="Logo" style={{ width: "25%", objectFit: "contain" }} />
        </NavLink>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex text-white">
            <NavLink className="nav-link mx-3" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link mx-2" to="/about">
              About
            </NavLink>
            <NavLink className="nav-link mx-3" to="/contact">
              Contact
            </NavLink>
          </div>

          <div className="d-flex align-items-center">
            {loggedIn ? (
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/storage">
                    Storage
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button style={{ backgroundColor: "#41C3FA", color: "#fff"}} onClick={handleShow}>
                Login
              </Button>
            )}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form ref={formRef} onSubmit={handleLogin}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>

                  <Modal.Footer>
                    <Button style={{ backgroundColor: "#41C3FA", color: "#fff" }} type="submit">
                      Login
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </nav>
  );
}