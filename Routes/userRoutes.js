const express= require('express');
const router = express.Router();
const {register, login, loggedIn, profile, updateprofile} = require('../Controllers/userController');
const validationToken = require('../middleware/ValidateToken.js')

//Create User
router.post('/register',register)
router.post('/login',login)
router.get('/current',validationToken,loggedIn)

//User Profile
router.get('/profile',validationToken,profile)
router.patch('/profile',validationToken,updateprofile)

module.exports = router;