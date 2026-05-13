const express = require('express');
const router = express.Router();
const validationToken = require('../middleware/ValidateToken');
const { processPayment,addWebHook,sendAPIKey,paymentVerification} = require('../Controllers/paymentController')

router.post('/process/:id',validationToken,processPayment)
router.get('/getkey',validationToken,sendAPIKey)
router.post('/webhook',addWebHook)
router.post('/verify',validationToken,paymentVerification)

module.exports = router;