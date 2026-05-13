const express = require('express');
const router = express.Router();
const Category = require('../Models/categoryModel');
const {createCat,readCat,readoneCat,updateCat,deleteCat,SearchCat} = require('../Controllers/categoryController');
const validationToken = require('../middleware/ValidateToken');
const role = require('../middleware/roleBased');

//For all Users
router.get('/',validationToken,readCat)
router.get('/search',validationToken,SearchCat)
router.get('/:id',validationToken,readoneCat)



//Only Admin can access
router.post('/',validationToken,role,createCat)
router.patch('/:id',validationToken,role,updateCat)
router.delete('/:id',validationToken,role,deleteCat)


module.exports = router;
