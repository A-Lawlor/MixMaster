import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import { Modal } from "react-bootstrap";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    background: "linear-gradient(#7000FF 0, rgba(175, 122, 243, 80) 35%, #1B00C3 100%)",
    width: '100%',
    height: '100%',
    paddingTop: '10vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1
};


export default function EditProfile() {
  // Edit Profile form
  const [form, setForm] = useState({
    username: "",
    email: "",
    about: "",
    picture: "",
    old_picture_id: ""
  });
  const [image, setImage] = useState({myFile:""});
  // Update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  // This method fetches the user's profile from the database.
  const [user_profiles, setUserProfiles] = useState([]);
  useEffect(() => {
    async function getUserProfiles() {
      const res = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user/getusername' : 'http://localhost:5005/user/getusername');
      if (!res.ok) {
        const message = `An error occurred: ${res.statusText}`;
        window.alert(message);
        return;
      }
      const username = await res.json();
      if(username.username === "") {
        handleNoLoginShow();
      }
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user' : 'http://localhost:5005/user');
      const response = await fetch(fetch_string);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user_profiles = await response.json();
      //console.log(user_profiles.filter((e) => e.name === username.username).find((e) => e.name === username.username).name);
      setUserProfiles(user_profiles);
      let my_profile = user_profiles.filter((e) => e.name === username.username).find((e) => e.name === username.username);
      updateForm({
        username: my_profile.name,
        email: my_profile.email,
        about: my_profile.about,
        picture: "",
        old_picture_id: my_profile.picture_id
      });
      setImage({...image, myFile:my_profile.picture_url});
    }
    getUserProfiles();
    return;
  }, [user_profiles.length]);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleNoLoginClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleNoLoginShow = () => setShow(true);

  
  function browseClicked(e) {
    e.preventDefault();
    document.getElementById('file').click();
  }
  async function fileSelectedHandler(e) {
    console.log(e);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({...image, myFile:base64});
    updateForm({ picture: base64 });
  }
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = error => {
        reject(error);
      };
    })
  }

  function resetClicked(e) {
    e.preventDefault();
  }
  async function saveClicked(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const updatedProf = { ...form };
    let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user/edit' : 'http://localhost:5005/user/edit');
    await fetch(fetch_string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProf),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ username: "", email: "", about: "", picture: ""});
    navigate("/vault");
  }
  function cancelClicked(e) {
    e.preventDefault();
    setForm({ username: "", email: "", about: "", picture: ""});
    navigate("/vault");
  }//"../../DefaultPicture.jpg"

  return (
    <div className="container-fluid" style={divStyle}>
      <div className = "editprofile_container">
        <div className="row">
          <div className="col-12 mt-4">
            <h1 id="editprofile_header">Edit Profile:</h1>
          </div>
      </div>
      <form>
        <div className="row">
          <div className="col-12 mt-3">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={form.username}
              onChange={(e) => updateForm({ username: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3">
            <h2>Update Picture:</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button onClick={browseClicked} className = "button-84s button-special editprofile_buttons">Browse</button>
            <input type="file" onChange={fileSelectedHandler} accept="image/*" style={{display:"none"}} id="file" name="file"/>
            <button onClick={resetClicked} className = "button-84s button-darker editprofile_buttons">Reset</button>
            {image.myFile==="" || image.myFile===null?"": <img src={image.myFile} className="profile_picture"  alt="Profile Pic Preview"/>} 
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-5">
            <TextField
              id="about"
              label="About Me"
              multiline rows={4}
              style={{width: "100%"}}
              value={form.about}
              onChange={(e) => updateForm({ about: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3">
            <button onClick={saveClicked} className = "button-84s button-special editprofile_buttons">Save</button>
            <button onClick={cancelClicked} className = "button-84s button-darker editprofile_buttons">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <>
      <Modal show={show} onHide={handleNoLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to access the storage page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
      </Modal>
    </>
  </div>
 );
}