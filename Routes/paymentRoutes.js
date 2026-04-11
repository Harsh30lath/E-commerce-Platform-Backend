const express = require('express');
const router = express.Router();
const validationToken = require('../middleware/ValidateToken');
const { processPayment,sendAPIKey,paymentVerification} = require('../Controllers/paymentController')

router.post('/process',validationToken,processPayment)
router.get('/getkey',validationToken,sendAPIKey)
router.post('/ge',validationToken,paymentVerification)

module.exports = router;