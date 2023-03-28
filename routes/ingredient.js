const { json, response } = require("express");
const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const ingredientRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
ingredientRoutes.route("/ingredient").get(function (req, res) {
 let db_connect = dbo.getDb("ingredients");
 db_connect
   .collection("ingridientslist")
   .find({})

   .toArray()
   .then ((result) => res.json(result))
   .then(console.log)
});


module.exports = ingredientRoutes;