import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Modal, Form } from "react-bootstrap";
import "../css/navbar.css"

export default function Navbar() {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('logged_in'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const formRefLogin = useRef(null);
  const formRefRegister = useRef(null);

  //Contact
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', subject: '', message: '' });

  const handleContactModalOpen = () => {
    setShowContactModal(true);
  };

  const handleContactModalClose = () => {
    setShowContactModal(false);
  };

  const handleContactFormChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prevContactForm) => ({ ...prevContactForm, [name]: value }));
  };

  const handleContactCompose = () => {
    const { name, subject, message } = contactForm;
    const mailtoUrl = `mailto:mixmaster.gui2@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${name}\n\n${message}`)}`;
    window.open(mailtoUrl);
  };

   //Login form
   const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function updateLoginForm(value) {
    return setLoginForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //Register form
  const [registerForm, setRegisterForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  function updateRegisterForm(value) {
    return setRegisterForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //Login Close function
  const handleLoginClose = () => {
    setLoginShow(false);
    formRefLogin.current.reset();
  };

  //Register Close function
  const handleRegisterClose = () => {
    setRegisterShow(false);
    formRefRegister.current.reset();
  };


  const handleShow = () => setLoginShow(true);

  //Handle a user pressing login and checking credentials
  async function handleLogin (event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newUser = { ...loginForm };

      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user/login' : 'http://localhost:5005/user/login');
      await fetch(fetch_string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      .then(response => response.json())
      .then(response => {
        if(String(response.message).localeCompare("Incorrect Username or Password")){
          console.log(response.name);
          localStorage.setItem('logged_in', true);
          setLoggedIn(true);
          handleLoginClose();
          localStorage.setItem('username', response.name);
          setUsername(response.name);
          setRegisterForm({ email: "", password: "" });
          return;
        } else {
          window.alert(response.message);
        }
      })
      .catch(error => {
        window.alert(error);
        return;
      });

      setRegisterForm({ email: "", password: "" });
    }
  };



    async function handleLogout () {
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user/logout' : 'http://localhost:5005/user/logout');
      await fetch(fetch_string, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          type: "logout"
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
      })
      .then(() => {
        localStorage.removeItem('logged_in');
        setLoggedIn(false);
        localStorage.removeItem('username');
        setUsername("");
        return;
      })
      .catch(error => {
        window.alert(error);
        return;
      });
    };

    //Handle a new user being registered
    async function handleRegister (event) {
      const form = event.currentTarget;
      //console.log(form.elements.passwordReg.value);
      //console.log(form.elements.confirmPasswordReg.value);
      event.preventDefault();
      //handleRegisterClose();
      // if (form.checkValidity() === false) {
      //   console.log("Getting to check validity");
      //   event.stopPropagation();
      // else 
      //console.log("Getting into else statement");
      if(form.elements.passwordReg.value !== form.elements.confirmPasswordReg.value){
        console.log("Passwords do not match");
        formRefRegister.current.reset();
        return;
      }

      const newUser = { ...registerForm };
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user/register' : 'http://localhost:5005/user/register');
      await fetch(fetch_string, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      .then(response => response.json())
      .then((response) => {
        if(response.message === "Email/Username already exists") {
          window.alert(response.message);
          return;
        }
        else {
          setRegisterForm({ email: "", name: "", password: "" });
          setLoginShow(true);
          handleRegisterClose();
          return;
        }
      })
      .catch(error => {
        window.alert(error);
        return;
      });
  };

  async function setStorage (_username) {
    const newUserStorage = { username:_username };
    let fetch_string2 = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/userstorage/adduser' : 'http://localhost:5005/userstorage/adduser');
    await fetch(fetch_string2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserStorage),
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.message + " setting up ingredient storage for " + _username);
      return;
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  }




 



  return (
  <nav className="navbar navbar-expand-sm navbar-light sticky-top" style={{ height: "60px", backgroundColor: "rgba(51, 51, 51, 0.9)" }}>
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
          <NavLink className="nav-link mx-3" onClick={handleContactModalOpen}>
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
              
                  <Dropdown.Item as={NavLink} to="/vault">
                    Vault
                  </Dropdown.Item>

                  <Dropdown.Item as={NavLink} to="/storage">
                    Storage
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/discover">
                    Discover
                  </Dropdown.Item>

                  <Dropdown.Item as={NavLink} to="/following">
                    Following
                  </Dropdown.Item>

                  <Dropdown.Item as={NavLink} to="/create">
                    Create Drink
                  </Dropdown.Item>

                  <Dropdown.Item as={NavLink} to="/trending">
                    Trending Drinks
                  </Dropdown.Item>

                  <Dropdown.Item as={NavLink} to="/editprofile">
                    Edit Profile
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleLogout} style={{ color: "red" }} as={NavLink} to="/">
                    Logout
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            ) : (
            <Button style={{ backgroundColor: "#41C3FA", color: "#fff"}} onClick={handleShow}>
              Login
            </Button>
          )}
          <Modal show={loginShow} onHide={handleLoginClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="register-text">
                  Don't have an account?{' '}
                  <span
                    className="register-link"
                    onClick={() => {
                      setLoginShow(false); // hide the login modal
                      setRegisterShow(true); // show the registration modal
                      console.log('Register link clicked!');
                    }}
                  >
                    Register
                  </span>
                </p>
                <Form ref={formRefLogin} onSubmit={handleLogin}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      placeholder="Enter email"
                      onChange={(e) => updateLoginForm({ email: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      onChange={(e) => updateLoginForm({ password: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Modal.Footer>
                    <Button style={{ backgroundColor: "#41C3FA", color: "#fff" }} type="submit">
                      Login
                    </Button>
                    <Button variant="secondary" onClick={handleLoginClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
            <Modal show={registerShow} onHide={handleRegisterClose}>
              <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="register-text">
                      Already have an account?{' '}
                      <span
                        className="register-link"
                        onClick={() => {
                          setLoginShow(true); // hide the login modal
                          setRegisterShow(false); // show the registration modal
                          console.log('Register link clicked!');
                        }}
                      >
                        Login
                      </span>
                    </p>
                  <Form ref={formRefRegister} onSubmit={handleRegister}>
                  <Form.Group controlId="formBasicEmailReg">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="emailRef"
                      placeholder="Enter Email"
                      onChange={(e) => updateRegisterForm({ email: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicUsernameReg">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameReg"
                      placeholder="Enter Username"
                      onChange={(e) => updateRegisterForm({ name: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPasswordReg">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="passwordReg"
                      placeholder="Enter Password"
                      onChange={(e) => updateRegisterForm({ password: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicConfirmPasswordReg">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPasswordReg"
                      placeholder="Confirm Password"
                      required
                    />
                  </Form.Group>

                  <Modal.Footer>
                    <Button style={{ backgroundColor: "#41C3FA", color: "#fff" }} type="submit">
                      Register
                    </Button>
                    <Button variant="secondary" onClick={handleRegisterClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
            <Modal show={showContactModal} onHide={handleContactModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={contactForm.name}
                onChange={handleContactFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                placeholder="Enter Subject"
                value={contactForm.subject}
                onChange={handleContactFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                placeholder="Enter Message"
                rows={3}
                value={contactForm.message}
                onChange={handleContactFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" style={{ backgroundColor: "#41C3FA", color: "#fff" }} onClick={handleContactCompose}>
            Compose
          </Button>
          <Button variant="secondary" onClick={handleContactModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
      </div>
    </nav>
  );
}