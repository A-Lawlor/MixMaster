import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";


export default function Create() {
 const [image, setImage] = useState({myFile:""});
 const [bgcolor1, setBgColor1] = useState("#000000");
 const [bgcolor2, setBgColor2] = useState("#000000");
 const [form, setForm] = useState({
   picture: "",
   name: "",
   liqour: "",
   taste: "",
   ingredients: "",
   about: ""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newDrink = { ...form };
   navigate("/");

   let fetch_string = (process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/drink/add' : 'http://localhost:5005/drink/add');
   await fetch(fetch_string, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newDrink),
   })
   .then((response) => {
      if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
      }
   })
   .then(() => {
      setForm({ picture: "", name: "", liqour: "", taste: "", ingredients: "", about: ""});
      navigate("/");
      return;
   })
   .catch(error => {
      window.alert(error);
      return;
   });
 
 }

 async function fileSelectedHandler(e) {
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
 // This following section will display the form that takes the input from the user.
 return (
   <div className="container-fluid mt-5 ms-5 p-5 bg-light border" style={{width:"60vw"}}>
     <h3>Create New Drink</h3>
     <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Drink Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Picture of Drink</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            id="image_input"
            onChange={(e) => fileSelectedHandler(e)}
          />
          {image.myFile==="" || image.myFile===null?"": <img src={image.myFile} className="drink_picture"  alt="Drink Pic Preview"/>}
        </div>
        <br></br>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="liqourOptions"
              id="positionVodka"
              value="Vodka"
              checked={form.liqour === "Vodka"}
              onChange={(e) => updateForm({ liqour: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">Vodka</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="liqourOptions"
              id="positionTequila"
              value="Tequila"
              checked={form.liqour === "Tequila"}
              onChange={(e) => updateForm({ liqour: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">Tequila</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="liqourOptions"
              id="positionWhiskey"
              value="Whiskey"
              checked={form.liqour === "Whiskey"}
              onChange={(e) => updateForm({ liqour: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">Whiskey</label>
          </div>
        </div>
        <br></br>
        <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionTaste"
             id="positionSweet"
             value="Sweet"
             checked={form.taste === "Sweet"}
             onChange={(e) => updateForm({ taste: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Sweet</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionTaste"
             id="positionSalty"
             value="Salty"
             checked={form.taste === "Salty"}
             onChange={(e) => updateForm({ taste: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Salty</label>
          </div>
          <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionTaste"
             id="positionSpicy"
             value="Spicy"
             checked={form.taste === "Spicy"}
             onChange={(e) => updateForm({ taste: e.target.value })}
           />
          <label htmlFor="positionJunior" className="form-check-label">Spicy</label>
        </div>
        </div>
        <br></br>
        <div className="form-group">
         <label htmlFor="ingredients">Ingredients</label>
         <input
           type="text"
           className="form-control"
           id="ingredients"
           value={form.ingredients}
           onChange={(e) => updateForm({ ingredients: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="about">About</label>
         <input
           type="text"
           className="form-control"
           id="about"
           value={form.about}
           onChange={(e) => updateForm({ about: e.target.value })}
         />
       </div>
       <br></br>
       <div className="form-group">
          <label htmlFor="bg-color1">Background Color 1</label>
          <input type="color" id="bg-color1" className="form-control" name="bg-color1" 
            value={bgcolor1} onChange={e => setBgColor1(e.target.value)} style={{width:'10em'}}/>
       </div>
       <div className="form-group">
          <label htmlFor="bg-color2">Background Color 2</label>
          <input type="color" id="bg-color2" className="form-control" name="bg-color2" 
            value={bgcolor2} onChange={e => setBgColor2(e.target.value)} style={{width:'10em'}}/>
       </div>
       <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Create Drink"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}