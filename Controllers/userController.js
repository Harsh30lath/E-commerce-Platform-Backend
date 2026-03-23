const asynchandler = require('express-async-handler');
const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = asynchandler(async(req,res) =>{
    const {username,number,email,password,confirmPassword,role} = req.body;

    if(!username || !number || !email || !password ||!confirmPassword || !role){
        res.status(400)
        throw new Error("Please fill all required fields")
    }

    if(password !== confirmPassword){
        res.status(400)
        throw new Error("Invalid Password!")
    }
    
    const userexist = await User.findOne({email});
    if(userexist){
        res.status(400)
        throw new Error("This EmailID already exist!")
    }

    const hashPass = await bcrypt.hash(password,10)
    const user = await User.create({
        username,number,email,
        password: hashPass,
        role
    })

    if(user){
        res.status(201).json({_id : user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not Valid");
    }
    
})

const login = asynchandler(async(req,res) =>{

    const {email,number,password} = req.body;
    if((!email && !number) || !password){
        res.status(400);
        throw new Error('Please fill the required field');
    }

    const user = await User.findOne({
        $or:[{email},{number}]
    })

    if(!user){
        res.status(400);
        throw new Error('User already exist!!');
    }

    if(user&&(await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign({
            user:{
                email: user.email,
                id: user.id 
            }
        },
        process.env.ACCESSTOKEN,
        {expiresIn:"30d"})

        console.log(accesstoken)

        return res.status(200).json(accesstoken)
        
    }else{
        res.status(400);
        throw new Error('Password Invalid')
    }
})

module.exports = {register,login}