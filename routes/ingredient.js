const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const ingredientRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
}, {collection: 'ingridientslist'});
const Ingredient = new mongoose.model("ingredients", ingredientSchema)


// This section will help you get a list of all the ingredients.
ingredientRoutes.route("/ingredient").get(function (req, res) {
 let db_connect = dbo.getDrinksDb("ingredients");
 db_connect
   .collection("ingridientslist")
   .find({})
   .toArray()
   .then ((result) => res.json(result))
});

// This section will help you get a single ingredient by id
ingredientRoutes.route("/ingredient/:id").get(function (req, res) {
  let db_connect = dbo.getDrinksDb("ingredients");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("ingridientslist")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // adding ingredients to database (don't allow regular users to use this)
 ingredientRoutes.route("/ingredient/add").post(async function (req, response) {
  let db_connect = dbo.getDrinksDb("ingredients");
  const ingredient = new Ingredient({name: req.body.name});
  //they use mongo connection not mongoose.
  db_connect.collection("ingridientslist").insertOne(ingredient, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
  return(response.json({message:"success"}));
 });


 /* put this code in a function to quickly add many ingredients to database
   async function addIngToDatabase() {
      console.log($("#ingredient_input_v").val());
      const addIngredient = { 
        name: $("#ingredient_input_v").val()
      };
      let fetch_string = (process.env.NODE_ENV === 'production' ?
                          'https://mix-master.herokuapp.com/ingredient/add' : 
                          'http://localhost:5005/ingredient/add');
      await fetch(fetch_string, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(addIngredient),
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error: ${response.status}`);
          }
      })
      .catch(error => {
          window.alert(error);
          return;
      });
    } 
    <input type="text" id="ingredient_input_v"></input>
    <Button id="vault-btn" onClick={addIngToDatabase} className="btn btn-secondary">add ingredient</Button>
    */

module.exports = ingredientRoutes;