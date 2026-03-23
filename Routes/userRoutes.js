const express= require('express');
const router = express.Router();
const {register, login} = require('../Controllers/userController');
const validationToken = require('../middleware/ValidateToken.js')

router.post('/register',register)
router.post('/login',login)

module.exports = router;