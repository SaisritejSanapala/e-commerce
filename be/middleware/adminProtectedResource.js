const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config');

const mongoose = require("mongoose");
const AdminModel = mongoose.model("AdminModel");

module.exports = (req, res, next)=>{
   
    const {authorization} = req.headers;
    //Bearer sfdgasfdg
    if(!authorization){
        return res.status(401).json({error: "User not logged in"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (error, payload)=>{
        if(error){
            return res.status(401).json({error: "User not logged in"});
        }
        const {_id} = payload;
        AdminModel.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next();//goes to the next middleware or goes to the REST API
        })
    });
}