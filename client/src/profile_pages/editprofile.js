import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import { Modal } from "react-bootstrap";
import "../css/profile.css";
import $ from "jquery";
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
    zIndex: -1,
    overflow: "auto"
};


export default function EditProfile() {
  // This method fetches the user's info used to query db from the client storage.
  const loggedIn = localStorage.getItem('logged_in');
  const username = localStorage.getItem('username');
  // Ensure user is signed in
  const navigate = useNavigate();
  const handleNoLoginClose = () => {
      navigate("/");
  };

  // Edit Profile form
  const [form, setForm] = useState({
    old_username: username,
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
      let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/user' : 'http://localhost:5005/user');
      const response = await fetch(fetch_string);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user_profiles = await response.json();
      setUserProfiles(user_profiles);
      let my_profile = user_profiles.filter((e) => e.name === username).find((e) => e.name === username);
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
  
  // browse user computer for images
  function browseClicked(e) {
    e.preventDefault();
    document.getElementById('file').click();
  }

  // once file is selected, decode image
  async function fileSelectedHandler(e) {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({...image, myFile:base64});
    updateForm({ picture: base64 });
  }
  // convert image to base 64 to upload to cloudinary upon profile update submission
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

  // @todo reset picture to original and don't perform image update on profile
  function resetClicked(e) {
    e.preventDefault();
  }

  // Edit user information by telling backend to update database with edit profile form info
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
    .then(response => response.json())
    .then((response) => {
      console.log("Changing name to: "+response.message);
      //localStorage.removeItem('username');
      localStorage.setItem('username', response.message);
      $("#dropdown-basic").text(response.message);
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ old_username: "", username: "", email: "", about: "", picture: ""});
    navigate("/vault");
  }

  // Redirect user back to vault, do not post any changes made in page to database
  function cancelClicked(e) {
    e.preventDefault();
    setForm({ old_username: "", username: "", email: "", about: "", picture: ""});
    navigate("/vault");
  }//"../../DefaultPicture.jpg"

  return (
    <div className="container-fluid" style={divStyle}>
      <div className = "editprofile_container" style={{height:"85vh", overflow: "auto"}}>
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
            {image.myFile==="" || image.myFile===null?"": <img src={image.myFile}
              className="profile_picture"  alt="Profile Pic Preview"/>}
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
      <Modal show={loggedIn === null} onHide={handleNoLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to access the storage page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
      </Modal>
    </>
  </div>
 );
}