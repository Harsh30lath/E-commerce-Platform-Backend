const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: [true,'Please enter your Name']
    },
    number:{
        type: String,
        trim: true,
        required: [true,'Please enter your Number'],
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid phone number"]
    },
    email:{
        type: String,
        trim: true,
        required: [true,'Please enter your EmailID'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Please enter your Password']
    },
    role:{
        type: String,
        enum:["admin","user"], 
        default:'user'
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)