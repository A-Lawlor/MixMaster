const express = require("express");
// const { default: mongoose } = require("mongoose");
const userCredentialsRoutes = express.Router();
const mongoose = require('mongoose');

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//For password security
const bcrypt = require('bcrypt');

const userSchema = {
    email: String,
   name: String,
    password: String
}
const User = new mongoose.model("User", userSchema)
 

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


userCredentialsRoutes.route("/user/login",(req,res)=>{
    let db_connect = dbo.getUsersStorageDb(); //Change name of this to be just user eventually
    const {email,password} =req.body;
    db_connect
        .collection("credentials")
        .findone({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    });
});

userCredentialsRoutes.route("/user/register").post(function (req, res) {
    console.log("Getting here");
    let db_connect = dbo.getUsersStorageDb(); //change name of this to be just user eventually
    db_connect.collection("credentials").findOne({email: req.body.email})
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




        //Handle errors  
        
//         } else {
//             let  user = {
//                 email: req.body.email,
//                 name: req.body.name,
//                 password: req.body.password,
//             };
//             db_connect.collection("credentials").insertOne(user, function (err, res) {
//                 if(err){
//                     res.send(err);
//                 }else{
//                     res.send({message:"sucessfull"});
//                 }
            
//             });
//         }
//     });
// });

// userCredentialsRoutes.route("/user/register").post(function (req, res) {
//     let db_connect = dbo.getUsersStorageDb(); //Change name of this to be just user eventually
//     const user = new User({email: req.body.email, name: req.body.name, password: req.body.password,})

//             db_connect.collection("credentials").insertOne(user, function (err, res) {
//                 if(err){
//                     res.send(err)
//                 }else{
//                     res.send({message:"sucessfull"})
//                 }
//             })
//         });




        
module.exports = userCredentialsRoutes;