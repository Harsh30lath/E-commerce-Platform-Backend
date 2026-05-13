const asynchandler = require('express-async-handler')
const jwt = require("jsonwebtoken");

const role = asynchandler(async(req,res,next) =>{
    if(req.user.role !== "admin"){
        return res.status(403).json("Access Denied")
    }
    next();
})

module.exports = role;