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
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      }],
}, {collection: 'credentials'});

const User = new mongoose.model("users", userSchema)


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
let globalUsername = "";



async function checkPassword(password, hash){
    const password_hashed = await bcrypt.hash(password, saltRounds);

    // if (hash == this.password) {
    //     return true;
    // }
    console.log(password);
    console.log(hash);
    const result = await bcrypt.compare(password, hash);
    console.log(result);
    return result;
}


userCredentialsRoutes.route("/user").get(function (req, res) {
    let db_connect = dbo.getUsersDb();
    db_connect
        .collection("credentials")
        .find({}, {projection: { password: 0 }})
        .toArray()
        .then((result) => res.json(result))
});

userCredentialsRoutes.route("/user/getusername").get(function (req, res) {
    return(res.json({username:globalUsername}));
});

userCredentialsRoutes.route("/user/logout").delete(function (req, res) {
    globalUsername = "";
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
                globalUsername = String(existingUser.name);
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

userCredentialsRoutes.route("/user/register").post(function (req, res) {
    let db_connect = dbo.getUsersDb(); //change name of this to be just user eventually
    db_connect.collection("credentials")
        .findOne({email: req.body.email})
        .then((existingUser)=>{
            if (existingUser) {
                console.log("Email already exists");
                return(res.json({message:"Email already exists"}));
            } else {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    const user = new User({email: req.body.email, name: req.body.name, password: hash,
                                           about: "", picture_id: "mixmaster/DefaultPicture",
                                           picture_url: "https://res.cloudinary.com/dgco11qpv/image/upload/v1681153540/mixmaster/DefaultPicture.jpg",
                                           followers:[],following:[]
                                        })                
                        db_connect.collection("credentials").insertOne(user, function (err, res) {
                            if(err){
                                res.send(err);
                            } else {
                                res.send({message:"sucessfull"});
                            }
                        });
                });
            };
        })
        .catch((err)=>{
            res.send({message:"Error"});
        });
});

// This section will help you edit a profile.
userCredentialsRoutes.route("/user/edit").post(async function (req, res) {
    let db_connect = dbo.getUsersDb();
    let myquery = { name: globalUsername };
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
            globalUsername = req.body.username;
            return res.send(JSON.stringify(req.body.name));
        }
        else {
            let myupdate= { $set: {
                name: req.body.username,
                email: req.body.email,
                about: req.body.about
                }
            };
            db_connect.collection("credentials").updateOne(myquery, myupdate, function (err, result) {
            if (err) throw err;
                res.json(result);
            });
            globalUsername = req.body.username;
            return res.send(JSON.stringify(req.body.name));
        }
    }
    catch (error) {
        console.log(error);
        return res.send(JSON.stringify(req.body.name));
    }
});
//  Follow / unfollow routes

// Route for me to follow user
// ex: PATCH localhost:5005/me/643379ae6157bbb888f4fa11/user/64305aca886115f36a865f30/follow
userCredentialsRoutes.route("/me/:me/user/:user/follow").patch(async function (req, res) {
    try {
        const query = {_id: req.params.me};
        const update = {$addToSet: {following: req.params.user}};

        await User.updateOne(query, update);
        const updatedMe = await User.findOne(query, {projection: { password: 0 }}).populate('following').lean();

        updatedMe.followers = await User.find({following: req.params.me});

        res.json(updatedMe);
    } catch (error) {
        res.status(500).json({message: 'Something wrong append', error});
    }
});

// Route for me to unfollow user
// ex: PATCH localhost:5005/me/643379ae6157bbb888f4fa11/user/64305aca886115f36a865f30/unfollow
userCredentialsRoutes.route("/me/:me/user/:user/unfollow").patch(async function (req, res) {
    try {
        const query = {_id: req.params.me};
        update =  {$pullAll: {following: [req.params.user]}};

        await User.updateOne(query, update);
        const updatedMe = await User.findOne(query).populate('following').lean();

        updatedMe.followers = await User.find({following: req.params.me});

        res.json(updatedMe);
    } catch (error) {
        res.status(500).json({message: 'Something wrong append', error});
    }
});
// Retrieve all my information - /me/my_mongo_id
// ex: GET localhost:5005/me/643379ae6157bbb888f4fa11
userCredentialsRoutes.route("/me/:me").get(async function (req, res) {
    try {
        const query = {_id: req.params.me};

        const me = await User.findOne(query).populate('following').lean();

        me.followers = await User.find({following: req.params.me});

        res.json(me);
    } catch (error) {
        res.status(500).json({message: 'Something wrong append', error});
    }
});

   
module.exports = userCredentialsRoutes;