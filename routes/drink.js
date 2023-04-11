const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
const cloudinary = require('../utils/cloudinary');

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/drink").get(function (req, res) {
 let db_connect = dbo.getDrinksDb("drinks");
 db_connect
   .collection("drinkfourm")
   .find({})
   .toArray()
   .then ((result) => res.json(result))
});
 
// This section will help you get a single record by id
recordRoutes.route("/drink/:id").get(function (req, res) {
  let db_connect = dbo.getDrinksDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  console.log("myquery:", myquery);
  console.log("req.params.id:", req.params.id);
  db_connect
    .collection("drinkfourm")
    .findOne(myquery, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while retrieving the drink" });
      } else {
        res.json(result);
      }
    });
});
 
// This section will help you create a new record.
recordRoutes.route("/drink/add").post(async function (req, response) {
 let db_connect = dbo.getDrinksDb();
 const upload_result = await cloudinary.uploader.upload(req.body.picture, {
  folder: "mixmaster"
 })
 let myobj = {
  name: req.body.name,
  liqour: req.body.liqour,
  picture_id: upload_result.public_id,
  picture_url: upload_result.secure_url,
  taste: req.body.taste,
  ingredients: req.body.ingredients,
  about: req.body.about
 };
 db_connect.collection("drinkfourm").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDrinksDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
  $set: {
    name: req.body.name,
    liqour: req.body.liqour,
    taste: req.body.taste,
    ingredients: req.body.ingredients,
    about: req.body.about
   },
 };
 db_connect
   .collection("drinkfourm")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
  
 // This section will help you delete a record
 recordRoutes.route("/drink/delete").delete((req, response) => {
   let db_connect = dbo.getDrinksDb();
   let myobj = {_id:new ObjectId(req.body._id)};
   db_connect.collection("drinkfourm").deleteOne(myobj, function (err, res) {
     if (err) throw err;
     response.json(res);
   });
   return response.send(JSON.stringify(myobj));
  });
  
  module.exports = recordRoutes;
