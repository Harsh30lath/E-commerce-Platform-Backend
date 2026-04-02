const express = require('express')
const router = express.Router()
const validationToken = require('../middleware/ValidateToken')
const  {postOrder,getOrder,getoneOrder,cancelOrder} = require('../Controllers/orderController')

router.post('/',validationToken,postOrder);
router.get('/my-orders',validationToken,getOrder);
router.get('/:id',validationToken,getoneOrder);
router.patch('/:id/cancel',validationToken,cancelOrder)

module.exports = router