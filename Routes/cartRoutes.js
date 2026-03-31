const express = require('express')
const router = express.Router();
const validationToken = require('../middleware/ValidateToken');
const {addCart,getCart,updateQuantity,removeCart} = require('../Controllers/cartController')


router.post('/',validationToken,addCart)
router.get('/',validationToken,getCart)
router.patch('/',validationToken,updateQuantity)
router.delete('/',validationToken,removeCart)


module.exports = router;