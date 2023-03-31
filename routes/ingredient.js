const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const ingredientRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the ingredients.
ingredientRoutes.route("/ingredient").get(function (req, res) {
<<<<<<< HEAD
 let db_connect = dbo.getDbIngredient("ingredients");
=======
 let db_connect = dbo.getIngredientsDb("ingredients");
>>>>>>> 506ab3338ad01cfa7cb8b27dea266f7e102a0142
 db_connect
   .collection("ingridientslist")
   .find({})
   .toArray()
   .then ((result) => res.json(result))
   .then(console.log)
});

// This section will help you get a single ingredient by id
ingredientRoutes.route("/ingredient/:id").get(function (req, res) {
  let db_connect = dbo.getIngredientsDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("ingridientslist")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

module.exports = ingredientRoutes;