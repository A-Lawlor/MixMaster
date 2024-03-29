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
  by: String,
  about: String,
  picture_id: String,
  picture_url: String,
  taste: String,
  drink_ingredients: [],
  about: String,
  ratings: [],
  overall_ratings: [],
  taste_ratings: [],
  likes: [],
  dislikes: [],
  bgcolor1: String,
  bgcolor2: String,
}, {collection: 'drinkform'});

const Drink = new mongoose.model("drinks", drinkSchema)

// This section will help you get a list of all the records.
recordRoutes.route("/drink").get(function (req, res) {
  let db_connect = dbo.getDrinksDb("drinks");
  db_connect
    .collection("drinkform")
    .find({})
    .toArray()
    .then((result) => res.json(result))
});
// This section will help you get a list of all the records.
recordRoutes.route("/drink/get_ids_and_ings").get(function (req, res) {
  let db_connect = dbo.getDrinksDb("drinks");
  db_connect
    .collection("drinkform")
    .find({}, {projection: { drink_ingredients: 1, likes: 1, dislikes: 1 }})
    .toArray()
    .then((result) => res.json(result))
});


// This section will help you get a drink by passed in liqour and taste attributes then will search the database for a drink with the liqour that contains the name of the liqour and the taste.
recordRoutes.route("/drink/generatedrink/:liquor/:taste").get(function (req, res) {
  console.log("getting into generatedrink");
  let db_connect = dbo.getDrinksDb("drinks");
  let liquor = req.params.liquor ? req.params.liquor.toString() : '';

  //This query will regex the liqour from the ingredients array and it will also check if the taste is equal to the taste attribute
  let myquery = {
    $and: [
      {
        drink_ingredients: {
          $elemMatch: {
            name: { $regex: liquor, $options: "i" }
          }
        }
      },
      { taste: req.params.taste }
    ]
  };
  //Old query let myquery = { Ingredients: { $regex: req.params.liqour, $options: "i" }, taste: req.params.taste };
  console.log("myquery:", myquery);
  console.log("req.params.liqour:", req.params.liquor);
  console.log("req.params.taste:", req.params.taste);
  db_connect
  .collection("drinkform")
  .aggregate([{ $match: myquery }, { $sample: { size: 1 } }])
  .toArray()
  .then((result) => {
    if (result && result.length > 0) {
      res.json(result[0]);
    } else {
      console.error("No Drink Found");
      res.status(404).json({ error: "No Drink Found" });
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: "An error occurred while retrieving the drink" });
  });
});


// This section will help you get a new drink based on previous drinks liqour and taste prefrences
recordRoutes.route("/drink/generatenewdrink/:liquor/:taste/:id").get(function (req, res) {
  console.log("getting into generatenewdrink");
  let db_connect = dbo.getDrinksDb("drinks");
 
    //This query will regex the liqour from the ingredients array and it will also check if the taste is equal to the taste attribute and the id cannot be equal to the id param
    let myquery = {
      $and: [
        {
          drink_ingredients: {
            $elemMatch: {
              name: { $regex: req.params.liquor, $options: "i" }
            }
          }
        },
        { taste: req.params.taste },
        { _id: { $ne: new ObjectId(req.params.id) } }
      ]
    };


  console.log("myquery:", myquery);
  console.log("req.params.liquor:", req.params.liquor);
  console.log("req.params.taste:", req.params.taste);

  db_connect
  .collection("drinkform")
  .aggregate([{ $match: myquery }, { $sample: { size: 1 } }])
  .toArray()
  .then((result) => {
    if (result && result.length > 0) {
      res.json(result[0]);
    } else {
      console.error("No Drink Found");
      res.status(404).json({ error: "No Drink Found" });
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: "An error occurred while retrieving the drink" });
  });
});




// This section will help you get a single record by id
recordRoutes.route("/drink/:id").get(function (req, res) {
  let db_connect = dbo.getDrinksDb("drinks");
  let myquery = { _id: new ObjectId(req.params.id) };
  //console.log("myquery:", myquery); use for debugging
  //console.log("req.params.id:", req.params.id); use for debugging
  db_connect
    .collection("drinkform")
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
 let db_connect = dbo.getDrinksDb("drinks");
 const upload_result = await cloudinary.uploader.upload(req.body.picture, {
  folder: "mixmaster"
 })
 const drink = new Drink({name: req.body.name, by: req.body.by, picture_id: upload_result.public_id,
                          picture_url: upload_result.secure_url, taste: req.body.taste, drink_ingredients: req.body.drink_ingredients,
                          about: req.body.about, rating: [], likes: [], dislikes: [], overall_ratings: [], taste_ratings: [],
                          bgcolor1: req.body.bgColor1, bgcolor2: req.body.bgColor2
 });
 db_connect.collection("drinkform").insertOne(drink)
          .then((result) => {
            return(response.json({message: result.insertedId.toString()}));
          })
          .catch(err => {
            console.log("ERROR adding drink: " + err);
            res.status(500).json({ error: "An error occurred while adding the drink" });
          });
});


// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDrinksDb("drinks");
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      image: req.body.image,
      name: req.body.name,
      by: req.body.by,
      picture_id: req.body.picture_id,
      picture_url: req.body.picture_url,
      drink_ingredients: req.body.drink_ingredients,
      about: req.body.about,
      taste: req.body.taste,
      rating: req.body.rating,
      overall_ratings: req.body.overall_ratings,
      taste_ratings: req.body.taste_ratings,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      bgcolor1: req.body.bgcolor1,
      bgcolor2: req.body.bgcolor2
    },
  };
  db_connect
    .collection("drinkform")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});



// This section will help you delete a record
recordRoutes.route("/drink/delete").delete((req, response) => {
  let db_connect = dbo.getDrinksDb("drinks");
  let myobj = { _id: new ObjectId(req.body._id) };
  db_connect.collection("drinkform").deleteOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
  return response.send(JSON.stringify(myobj));
});


// THE FOUR BELOW FUNCTIONS UPDATE USERS RATINGS FOR SPECIFIC DRINKS
recordRoutes.route("/drink/first_rate_drink_overall").post((req, res) => {
  let db_connect = dbo.getDrinksDb("drinks");
  let myquery = { _id: new ObjectId(req.body.id) };
  let myupdate = { $push: { overall_ratings: req.body.new_rating } };
  db_connect.collection("drinkform").updateOne(myquery, myupdate, function (err, result) {
    if (err) throw err;
      res.json(result);
  });
  return res.send(JSON.stringify(req.body.new_rating));
});
recordRoutes.route("/drink/first_rate_drink_taste").post((req, res) => {
  let db_connect = dbo.getDrinksDb("drinks");
  let myquery = { _id: new ObjectId(req.body.id) };
  let myupdate = { $push: { taste_ratings: req.body.new_rating } };
  db_connect.collection("drinkform").updateOne(myquery, myupdate, function (err, result) {
    if (err) throw err;
      res.json(result);
  });
  return res.send(JSON.stringify(req.body.new_rating));
});
recordRoutes.route("/drink/rate_drink_overall").post((req, res) => {
  let db_connect = dbo.getDrinksDb("drinks");
  let myquery = { _id: new ObjectId(req.body.id), "overall_ratings": req.body.old_rating };
  let myupdate = { $set: { "overall_ratings.$" : req.body.new_rating } };
  db_connect.collection("drinkform").updateOne(myquery, myupdate, function (err, result) {
      if (err) throw err;
      res.json(result);
  });
  return res.send(JSON.stringify(req.body.new_rating));
});
recordRoutes.route("/drink/rate_drink_taste").post((req, res) => {
  let db_connect = dbo.getDrinksDb("drinks");
  let myquery = { _id: new ObjectId(req.body.id), "taste_ratings": req.body.old_rating };
  let myupdate = { $set: { "taste_ratings.$" : req.body.new_rating } };
  db_connect.collection("drinkform").updateOne(myquery, myupdate, function (err, result) {
      if (err) throw err;
      res.json(result);
  });
  return res.send(JSON.stringify(req.body.new_rating));
});


module.exports = recordRoutes