const express = require("express");
// const { default: mongoose } = require("mongoose");
const userCredentialsRoutes = express.Router();
const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//For password security
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    about: String,
    picture_id: String,
    picture_url: String,
    following: [],
    followers: [],
    ingredient_storage: [],
}, {collection: 'credentials'});

const User = new mongoose.model("users", userSchema)


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

userCredentialsRoutes.route("/user").get(function (req, res) {
    let db_connect = dbo.getUsersDb();
    db_connect
        .collection("credentials")
        .find({}, {projection: { password: 0 }})
        .toArray()
        .then((result) => res.json(result))
});


userCredentialsRoutes.route("/user/logout").delete(function (req, res) {
    return(res.json({type:req.body.type}));
});

userCredentialsRoutes.route("/user/login").post(function async(req, res) {
    console.log("Getting into login");
    let db_connect = dbo.getUsersDb(); //Change name of this to be just user eventually
    db_connect
        .collection("credentials")
        .findOne({email: req.body.email})
        .then(async (existingUser)=>{
        if(existingUser){
            console.log("is a user");
            const match = await bcrypt.compare(req.body.password, existingUser.password);
            if(match){
                console.log("login successfull");
                res.send({message:"Login Success",name: String(existingUser.name)})
            }else{
                console.log("wrong credentials");
                return(res.json({message:"Incorrect Username or Password"}));
            }
        } else {
            console.log("Not registered");
            return(res.json({message:"Incorrect Username or Password"}));
        }
        })
        .catch((err)=>{
            return(res.json({message:"Error"}));
        }); 
});

userCredentialsRoutes.route("/user/register").post(function (req, response) {
    let db_connect = dbo.getUsersDb(); //change name of this to be just user eventually
    db_connect.collection("credentials")
        .findOne({
            $or: [
                    {email: req.body.email},
                    {name: req.body.name}
                 ]
        })
        .then((existingUser)=>{
            if (existingUser) {
                console.log("Email/Username already exists");
                return(response.json({message:"Email/Username already exists"}));
            } else {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    const user = new User({email: req.body.email, name: req.body.name, password: hash,
                                           about: "", picture_id: "mixmaster/DefaultPicture",
                                           picture_url: "https://res.cloudinary.com/dgco11qpv/image/upload/v1681153540/mixmaster/DefaultPicture.jpg",
                                           following:[], followers:[], ingredient_storage:[]
                                        });
                                        //db_connect is mongo connect, not mongoose.
                    db_connect.collection("credentials").insertOne(user, function (err, res) {
                        if(err){
                            console.log("error inserting to credentials collection");
                            return(res.send(err));
                        }
                    });
                    return(response.json({message:"Successfully registered account under email: "+req.body.email}));
                });
            };
        })
        .catch((err)=>{
            console.log("register findOne() error");
            return(res.send(err));
        });
});

// This section will help you get a list of all the ingredients.
userCredentialsRoutes.route("/user/retrieve_storage/:username").get(function (req, res) {
    let db_connect = dbo.getUsersDb();
    db_connect
      .collection("credentials")
      .findOne({name: req.params.username}, {projection: { password: 0 }})
      .then ((result) => res.json(result))
});

// Add ingredients to a user's storage
userCredentialsRoutes.route("/user/add_ingredient_to_storage/:username").post(function (req, res) {
    let db_connect = dbo.getUsersDb();
    let myquery = { name: req.params.username };
    let myupdate = { $addToSet: { ingredient_storage: req.body.name } };
    db_connect.collection("credentials").updateOne(myquery, myupdate, function (err, result) {
      if (err) throw err;
        res.json(result);
    });
    return res.send(JSON.stringify(req.body.name));
  });
  
// This section will help you delete an ingredient from a user's storage
userCredentialsRoutes.route("/user/delete_ingredient_from_storage/:username").delete((req, res) => {
    let db_connect = dbo.getUsersDb();
    let myquery = { name: req.params.username };
    let myupdate = { $pull: { ingredient_storage: req.body.name } };
    db_connect.collection("credentials").updateOne(myquery, myupdate, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
    return res.send(JSON.stringify(req.body.name));
});

// This section will help you edit a profile.
userCredentialsRoutes.route("/user/edit").post(async function (req, res) {
    let db_connect = dbo.getUsersDb();
    let myquery = { name: req.body.old_username };
    try {
        if(req.body.picture != "") {
            const upload_result = await cloudinary.uploader.upload(req.body.picture, {
                folder: "mixmaster"
            })
            if(String(req.body.old_picture_id) != "mixmaster/DefaultPicture") {
                cloudinary.uploader.destroy(req.body.old_picture_id);
            }
            let myupdate= { $set: {
                            name: req.body.username,
                            email: req.body.email,
                            about: req.body.about,
                            picture_id: upload_result.public_id,
                            picture_url: upload_result.secure_url,
                            }
                        };
            db_connect.collection("credentials").updateOne(myquery, myupdate, function (err, result) {
            if (err) throw err;
                res.json(result);
            });
            return(res.json({message:req.body.username}));
        }
        else {
            let myupdate= { $set: {
                name: req.body.username,
                email: req.body.email,
                about: req.body.about,
                }
            };
            db_connect.collection("credentials").updateOne(myquery, myupdate, function (err, result) {
            if (err) throw err;
                res.json(result);
            });
            return(res.json({message:req.body.username}));
        }
    }
    catch (error) {
        console.log(error);
        return(res.send(error));
    }
});


//  Follow / unfollow routes

// Route for me to follow user
// ex: PATCH localhost:5005/me/643379ae6157bbb888f4fa11/user/64305aca886115f36a865f30/follow
userCredentialsRoutes.route("/me/:me/user/:user/follow").patch(async function (req, res) {
    try {
        let db_connect = dbo.getUsersDb();
        var my_id = new ObjectId(req.params.me);
        var user_id = new ObjectId(req.params.user);
        let myquery = { _id: my_id };
        let myupdate = { $addToSet: { following: user_id } };

        await db_connect.collection("credentials").updateOne(myquery, myupdate, function (err) {
          if (err) throw err;
        });

        let myquery2 = { _id: user_id };
        let myupdate2 = { $addToSet: { followers: my_id } };
        await db_connect.collection("credentials").updateOne(myquery2, myupdate2, function (err) {
          if (err) throw err;
        });

        let followers_arr = await db_connect.collection("credentials").findOne(myquery2);
        res.json({message: followers_arr.followers.length});
        return;
    } catch (error) {
        res.status(500).json({message: 'Something wrong append', error});
    }
});

// Route for me to unfollow user
// ex: PATCH localhost:5005/me/643379ae6157bbb888f4fa11/user/64305aca886115f36a865f30/unfollow
userCredentialsRoutes.route("/me/:me/user/:user/unfollow").patch(async function (req, res) {
    try {
        let db_connect = dbo.getUsersDb();
        var my_id = new ObjectId(req.params.me);
        var user_id = new ObjectId(req.params.user);
        let myquery = {_id: my_id};
        let myupdate =  {$pullAll: {following: [user_id]}};

        await db_connect.collection("credentials").updateOne(myquery, myupdate, function (err) {
          if (err) throw err;
        });

        let myquery2 = { _id: user_id };
        let myupdate2 = { $pullAll: {followers: [my_id]} };
        await db_connect.collection("credentials").updateOne(myquery2, myupdate2, function (err) {
          if (err) throw err;
        });

        let followers_arr = await db_connect.collection("credentials").findOne(myquery2);
        res.json({message: followers_arr.followers.length});
        return;
    } catch (error) {
        res.status(500).json({message: 'Something wrong append', error});
    }
});

// Retrieve all my information - /me/my_mongo_id
// ex: GET localhost:5005/me/643379ae6157bbb888f4fa11
userCredentialsRoutes.route("/me/:me").get(async function (req, res) {
    try {
        let db_connect = dbo.getUsersDb();
        var my_id = new ObjectId(req.params.me);
        const query = {_id: my_id};

        const me = await db_connect.collection("credentials").findOne(query).populate('following').lean();

        me.followers = await db_connect.collection("credentials").find({following: my_id});

        res.json(me);
    } catch (error) {
        res.status(500).json({message: 'Something wrong append', error});
    }
});

   
module.exports = userCredentialsRoutes;