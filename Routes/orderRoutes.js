const express = require('express')
const router = express.Router()
const validationToken = require('../middleware/ValidateToken')
const roleBased = require('../middleware/roleBased')
const  {postOrder,getOrder,getoneOrder,cancelOrder,getAllOrder,getSingleOrder} = require('../Controllers/orderController')

router.post('/',validationToken,postOrder);
router.get('/my-orders',validationToken,getOrder);
router.get('/:id',validationToken,getoneOrder);
router.patch('/:id/cancel',validationToken,cancelOrder)

//Only Admin can access
router.get('/',validationToken,roleBased,getAllOrder)
router.get('/:id',validationToken,roleBased,getSingleOrder)

module.exports = router