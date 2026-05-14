const express = require('express');
const router = express.Router();
const validationToken = require('../middleware/ValidateToken');
const role = require('../middleware/roleBased')
const {CategoriesByGender,createProduct,readProduct,readoneProduct,updateProduct,deleteProduct} = require('../Controllers/productController')
const upload = require('../middleware/upload')

//For all Users 
router.get('/',validationToken,readProduct)
router.get('/category', validationToken,CategoriesByGender)
router.get('/:id',validationToken,readoneProduct)



//Only Admin can access
router.post('/',validationToken,upload.array('image',10),role,createProduct)
router.patch('/:id',validationToken,role,updateProduct)
router.delete('/:id',validationToken,role,deleteProduct)



module.exports = router;