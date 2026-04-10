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

const webhook = asynchandler(async(req,res) =>{
    const event = req.body.event;

    if (event === "payment.captured") {
        const payment = req.body.payload.payment.entity;

        console.log(payment.id);
        console.log(payment.order_id);

    }

    res.status(200).json({ status: "ok" });
})

module.exports = {processPayment,sendAPIKey,webhook}