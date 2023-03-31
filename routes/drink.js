const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/drink").get(function (req, res) {
<<<<<<< HEAD
 let db_connect = dbo.getDbDrinks("drinks");
=======
 let db_connect = dbo.getDrinksDb("drinks");
>>>>>>> 506ab3338ad01cfa7cb8b27dea266f7e102a0142
 db_connect
   .collection("drinkfourm")
   .find({})
<<<<<<< Updated upstream
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
=======
   .toArray()
   .then ((result) => res.json(result))
   .then(console.log)
>>>>>>> Stashed changes
});
 
// This section will help you get a single record by id
recordRoutes.route("/drink/:id").get(function (req, res) {
<<<<<<< HEAD
 let db_connect = dbo.getDbDrinks();
=======
 let db_connect = dbo.getDrinksDb();
>>>>>>> 506ab3338ad01cfa7cb8b27dea266f7e102a0142
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("drinkfourm")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/drink/add").post(function (req, response) {
<<<<<<< HEAD
 let db_connect = dbo.getDbDrinks();
=======
 let db_connect = dbo.getDrinksDb();
>>>>>>> 506ab3338ad01cfa7cb8b27dea266f7e102a0142
 let myobj = {
   name: req.body.name,
   liqour: req.body.position,
   taste: req.body.position,
   rating: req.body.level
 };
 db_connect.collection("drinkfourm").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
<<<<<<< HEAD
 let db_connect = dbo.getDbDrinks();
=======
 let db_connect = dbo.getDrinksDb();
>>>>>>> 506ab3338ad01cfa7cb8b27dea266f7e102a0142
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    name: req.body.name,
    liqour: req.body.position,
    taste: req.body.position,
    rating: req.body.level
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
<<<<<<< Updated upstream
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("drinkfourm").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
=======
recordRoutes.route("/drink/delete").delete((req, response) => {
<<<<<<< HEAD
  let db_connect = dbo.getDbDrinks();
=======
  let db_connect = dbo.getDrinksDb();
>>>>>>> 506ab3338ad01cfa7cb8b27dea266f7e102a0142
  let myobj = {_id:new ObjectId(req.body._id)};
  db_connect.collection("drinkfourm").deleteOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
  return response.send(JSON.stringify(myobj));
>>>>>>> Stashed changes
 });
});
 
module.exports = recordRoutes;