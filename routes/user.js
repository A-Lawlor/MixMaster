const express = require("express");
// const { default: mongoose } = require("mongoose");
const userCredentialsRoutes = express.Router();
const mongoose = require('mongoose');

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//For password security
var bcrypt = require('bcryptjs');


const userSchema = {
    email: String,
    name: String,
    password: String
}
const User = new mongoose.model("User", userSchema)
 

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';



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


userCredentialsRoutes.route("/user/login").post(function async(req, res) {
    console.log("Getting into login");
    let db_connect = dbo.getUsersStorageDb(); //Change name of this to be just user eventually
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

userCredentialsRoutes.route("/user/register").post(function (req, res) {
    let db_connect = dbo.getUsersStorageDb(); //change name of this to be just user eventually
    db_connect.collection("credentials")
        .findOne({email: req.body.email})
        .then((existingUser)=>{
            if (existingUser) {
                console.log("Email already exists");
                return(res.json({message:"Email already exists"}));
            } else {

                
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    const user = new User({email: req.body.email, name: req.body.name, password: hash,})                
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
   
module.exports = userCredentialsRoutes;