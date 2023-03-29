import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   liqour: "",
   taste: "",
   rating: "",
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
 
   await fetch("http://localhost:5005/drink/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newDrink),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", liqour: "", taste: "", rating: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
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

       <br></br>

       <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="liqourOptions"
              id="positionVodka"
              value="Vodka"
              checked={form.level === "Vodka"}
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
              checked={form.level === "Tequila"}
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
              checked={form.level === "Whiskey"}
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
             checked={form.level === "Sweet"}
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
             checked={form.level === "Salty"}
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
             checked={form.level === "Spicy"}
             onChange={(e) => updateForm({ taste: e.target.value })}
           />
          <label htmlFor="positionJunior" className="form-check-label">Spicy</label>
         </div>
       </div>
       
       <br></br>

       <div className="form-group">
         <label htmlFor="rating">Rating</label>
         <input
           type="number"
           className="form-control"
           id="rating"
           value={form.rating}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
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