const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const validationToken = asynchandler(async(req,res,next) =>{
    let token;
        const AuthHead = req.headers.Authorization || req.headers.authorization
    
        if(!AuthHead){
            res.status(401);
            throw new Error('User unauthorized');
        }
        
        if(AuthHead && AuthHead.startsWith('Bearer ')){
            token  = AuthHead.split(' ')[1];
        }
        
        if(!token){
            res.status(401);
            throw new Error('Token Missing');
        }

        try {
        const decoded = jwt.verify(token,process.env.ACCESSTOKEN);
        req.user = decoded.user;
        next()

    } catch (error) {
        console.log('Validation error' , error)
        res.status(401);
        throw new Error('User unauthorized');
    }

    
}) 
module.exports = validationToken;