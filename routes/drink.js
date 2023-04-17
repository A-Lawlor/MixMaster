const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
const cloudinary = require('../utils/cloudinary');
const mongoose = require('mongoose');

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


const drinkSchema = new mongoose.Schema({
  name: String,
  liqour: String,
  about: String,
  picture_id: String,
  picture_url: String,
  taste: String,
  ingredients: String,
  about: String,
  ratings: [],
  likes: [],
  dislikes: [],
}, {collection: 'drinkfourm'});

const Drink = new mongoose.model("drinks", drinkSchema)

// This section will help you get a list of all the records.
recordRoutes.route("/drink").get(function (req, res) {
  let db_connect = dbo.getDrinksDb("drinks");
  db_connect
    .collection("drinkfourm")
    .find({})
    .toArray()
    .then((result) => res.json(result))
});

// This section will help you get a single record by id
recordRoutes.route("/drink/:id").get(function (req, res) {
  let db_connect = dbo.getDrinksDb("drinks");
  let myquery = { _id: new ObjectId(req.params.id) };
  console.log("myquery:", myquery);
  console.log("req.params.id:", req.params.id);
  db_connect
    .collection("drinkfourm")
    .findOne(myquery)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        console.error("No document found with the specified _id");
        res.status(404).json({ error: "No document found with the specified _id" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while retrieving the drink" });
    });
});

// This section will help you create a new record.

recordRoutes.route("/drink/add").post(async function (req, response) {
 let db_connect = dbo.getDrinksDb();
 const upload_result = await cloudinary.uploader.upload(req.body.picture, {
  folder: "mixmaster"
 })
 const drink = new Drink({name: req.body.name, liqour: req.body.liqour, picture_id: upload_result.public_id,
                          picture_url: upload_result.secure_url, taste: req.body.taste, ingredients: req.body.ingredients,
                          about: req.body.about, rating: [], likes: [], dislikes: [],
 });
 db_connect.collection("drinkfourm").insertOne(drink, function (err, res) {
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
      image: req.body.image,
      name: req.body.name,
      liqour: req.body.liqour,
      taste: req.body.taste,
      rating: req.body.rating,
      likes: req.body.likes,
      dislikes: req.body.dislikes
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
  let myobj = { _id: new ObjectId(req.body._id) };
  db_connect.collection("drinkfourm").deleteOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);

  });
  return response.send(JSON.stringify(myobj));
});

module.exports = recordRoutes