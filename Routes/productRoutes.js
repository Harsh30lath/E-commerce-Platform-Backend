const express = require('express');
const router = express.Router();
const validationToken = require('../middleware/ValidateToken');
const role = require('../middleware/roleBased')
const {createProduct,readProduct,readoneProduct,updateProduct,deleteProduct} = require('../Controllers/productController')

//For all Users 
router.get('/',validationToken,readProduct)
router.get('/:id',validationToken,readoneProduct)



//Only Admin can access
router.post('/',validationToken,role,createProduct)
router.patch('/:id',validationToken,role,updateProduct)
router.delete('/:id',validationToken,role,deleteProduct)



module.exports = router;