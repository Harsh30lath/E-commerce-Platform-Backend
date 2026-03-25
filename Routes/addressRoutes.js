const express = require('express');
const router = express.Router()
const {addAddress, getAddress, updateAddress,deleteAddress, oneAddress} = require('../Controllers/addressController')
const validationToken = require('../middleware/ValidateToken.js')

router.post('/address',validationToken,addAddress);
router.get('/address',validationToken,getAddress);
router.get('/address/:id',validationToken,oneAddress);
router.patch('/address/:id',validationToken,updateAddress)
router.delete('/address/:id',validationToken,deleteAddress)

module.exports = router;
