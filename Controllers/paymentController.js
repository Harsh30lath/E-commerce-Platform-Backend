const asynchandler = require('express-async-handler')
const instance = require('../Config/razorpay');
const crypto = require("crypto");

const processPayment = asynchandler(async(req,res) =>{
    const options = {
        amount:Number(req.body.amount*100),
        currency:'INR'
    }
    const order = await instance.orders.create(options)
    if (!order){
        return res.status(500).json({ message: "Order creation failed" });
    }
    res.status(200).json(order)
})

const sendAPIKey = asynchandler(async(req,res) =>{
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
})

const paymentVerification = asynchandler(async(req,res) =>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
        
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest('hex');
        
    if (expectedSignature === razorpay_signature){
        return res.status(200).json({
        success: true,
        message: "Payment Verified"
    })
    } else {
        return res.status(400).json({
        success: false,
        message: "Invalid Signature"
        })
    }}
);

module.exports = {processPayment,sendAPIKey,paymentVerification}