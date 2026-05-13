const asynchandler = require('express-async-handler')
const instance = require('../Config/razorpay');
const crypto = require("crypto");
const Order = require('../Models/orderModel');

const processPayment = asynchandler(async(req,res) =>{
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json( "Order not found" )
    }

    const options = {
        amount:order.amount*100,
        currency:'INR',
        receipt: order._id.toString()
    }

    const payment = await instance.orders.create(options)

    if (!payment){
        return res.status(500).json({ message: "Order creation failed" })
    }
    res.status(200).json(payment)
})

const sendAPIKey = asynchandler(async(req,res) =>{
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
})

const addWebHook = asynchandler(async(req,res) =>{

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET; 
        
        
    const signature = req.headers['x-razorpay-signature'];
        
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');
        
    if (signature !== expectedSignature) {
        console.log('Invalid signature - Webhook rejected');
        return res.status(400).json({
        success: false,
        message: 'Invalid webhook signature'
        });
    }
        
    console.log("Webhook verified");
    console.log('Event received:', req.body.event);
    console.log('Full webhook data:', req.body);

    return res.status(200).json({
        success: true,
        message: 'Webhook received successfully'
    });

    if(signature === expectedSignature){
        Order.paymentStatus = "paid";
    }else{
        Order.paymentStatus = "pending";
    }
    await Order.save();
    res.json({status:"Ok"})
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

module.exports = {processPayment,addWebHook,sendAPIKey,paymentVerification}