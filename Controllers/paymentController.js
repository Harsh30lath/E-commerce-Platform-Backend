const asynchandler = require('express-async-handler')
const instance = require('../Config/razorpay');

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
    console.log(req.body)
    
    res.status(200).json("true")
})

module.exports = {processPayment,sendAPIKey,paymentVerification}