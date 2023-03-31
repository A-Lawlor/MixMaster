import React from "react";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

const divStyle = {
    width: '100%',
    height: '100vh',
    paddingTop: '5vh',
    background: "linear-gradient(#7000FF 0, rgba(175, 122, 243, 80) 35%, #1B00C3 100%)"
};


export default function EditProfile() {
  const navigate = useNavigate();

  function browseClicked() {
    alert("Browse Photos");
  }
  function resetClicked() {
    alert("Resetting Profile Photo to Default");
  }
  function saveClicked() {
    navigate("/vault");
  }
  function cancelClicked() {
    navigate("/vault");
  }

 return (
  <div className="container-fluid" style={divStyle}>
    <div className = "editprofile_container">
        <div className="row">
            <div className="col-12 mt-4">
                <h1 id="editprofile_header">Edit Profile:</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-12 mt-3">
                <TextField id="name" label="Name" variant="outlined"/>
            </div>
        </div>
        <div className="row">
            <div className="col-12 mt-3">
                <TextField id="username" label="Username" variant="outlined"/>
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
                <button onClick={resetClicked} className = "button-84s button-darker editprofile_buttons">Reset</button>
                <img className="profile_picture" src="../../DefaultPicture.jpg" alt="Profile Pic Preview"/>
            </div>
        </div>
        <div className="row">
            <div className="col-12 mt-5">
                <TextField
                    id="outlined-multiline-static"
                    label="About Me"
                    multiline
                    rows={4}
                    style = {{width: "100%"}}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-12 mt-3">
                <button onClick={saveClicked} className = "button-84s button-special editprofile_buttons">Save</button>
                <button onClick={cancelClicked} className = "button-84s button-darker editprofile_buttons">Cancel</button>
            </div>
        </div>
    </div>
  </div>
 );
}