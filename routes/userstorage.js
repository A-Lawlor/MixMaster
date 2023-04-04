const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userStorageRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the ingredients.
userStorageRoutes.route("/userstorage").get(function (req, res) {
 let db_connect = dbo.getUsersStorageDb();
 db_connect
   .collection("storage")
   .find({})
   .toArray()
   .then ((result) => res.json(result))
   .then(console.log)
});

// This section will help you get a single ingredient by id
userStorageRoutes.route("/userstorage/:id").get(function (req, res) {
  let db_connect = dbo.getUsersStorageDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("storage")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 userStorageRoutes.route("/userstorage/add").post(function (req, res) {
  let db_connect = dbo.getUsersStorageDb();
  let myquery = { username: req.body.username };
  let myupdate = { $push: { my_ingredients: req.body.name } };
  db_connect.collection("storage").updateOne(myquery, myupdate, function (err, result) {
    if (err) throw err;
      res.json(result);
  });
  return res.send(JSON.stringify(req.body.name));
});

 // This section will help you delete a user ingredient
 userStorageRoutes.route("/userstorage/delete").delete((req, res) => {
  let db_connect = dbo.getUsersStorageDb();
  let myquery = { username: req.body.username };
  let myupdate = { $pull: { my_ingredients: req.body.name } };
  db_connect.collection("storage").updateOne(myquery, myupdate, function (err, result) {
    if (err) throw err;
      res.json(result);
  });
  return res.send(JSON.stringify(req.body.name));
 });

module.exports = userStorageRoutes;