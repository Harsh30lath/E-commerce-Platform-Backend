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

    const nameexist = await User.findOne({username});
    if(nameexist){
        res.status(400)
        throw new Error("This Username already exist. Please try another!")
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

const loggedIn = asynchandler(async(req,res)=>{
    const user = await User.findById(req.user.id).select('username email')
    res.status(200).json(user)
})

const profile = asynchandler(async(req,res) =>{
    const user =await User.findById(req.user.id)
    .select('username email phone role')

    if(!user){
        res.status(400);
        throw new Error("User doesnot exist")
    }

    res.json(user);
})

const updateprofile = asynchandler(async(req,res)=>{
    const {username,email,number } = req.body;
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(400);
        throw new Error("User doesnot exist")
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.number = number || user.number;

    const updateuser = await user.save()
    
    res.status(200).json({
    username: updateuser.username,
    email: updateuser.email,
    phone: updateuser.phone, });

})


module.exports = {register,login,loggedIn,profile,updateprofile}