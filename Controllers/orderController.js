const asynchandler = require('express-async-handler');
const Order = require('../Models/orderModel')
const Address = require('../Models/addressModel')
const Product = require('../Models/productModel')
const Cart = require('../Models/cartModel')



const postOrder = asynchandler(async(req,res) =>{
    const { product: productId, quantity } = req.body;
    const addressDoc = await Address.findOne({user: req.user.id})
    const cart = await Cart.findOne({user: req.user.id}).populate('items.product')
    const product = await Product.findById(productId);
    if (!addressDoc) {
        res.status(404);
        throw new Error("Address not found");
    }
   
    const address = addressDoc._id;
    
    let items = [];
    if(productId){
        
        if(!product){
        res.status(400);
        throw new Error("Product doesnot Exist");
        }

        items.push({
        product:productId,
        quantity: quantity||1,
        price: Number(product.price)
    })}
    else{        
        if(!cart){
        res.status(400);
        throw new Error("Cart is empty");
        }

        items = cart.items.map(item =>({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }))

       
    }

    for (const item of items) {
       const update =  await Product.updateOne(
            { _id: item.product, stock: { $gte: item.quantity } },
            { $inc: { stock: -item.quantity } }
        )

        if (update.modifiedCount === 0) {
            res.status(400);
            throw new Error("Insufficient stock");
        }
    }


    let amount = 0;
    for(let item of items){
        amount += item.price * item.quantity;
    }

    const order = await Order.create({
    user: req.user.id,
    items,
    amount,
    address,
    paymentStatus: "pending"
    });
    cart.items = [];
    await cart.save();

  res.status(201).json(order)


})

const getOrder = asynchandler(async(req,res) =>{
    const order = await Order.find({ user: req.user.id }).select("items.product items.price")
    if(!order){
        res.status(400)
        throw new Error('No orders there')
    }

    res.status(200).json(order);
})

const getoneOrder = asynchandler(async(req,res) =>{
    const singleorder = await Order.findById(req.params.id);
    if(!singleorder){
        res.status(400)
        throw new Error('Order doesnot exist')
    }

    if(singleorder.user.toString() !== req.user.id){
        res.status(400)
        throw new Error('User doesnot exist')
    }
    
    res.status(200).json(singleorder);
})

const cancelOrder = asynchandler(async(req,res) =>{
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id) 
     
    if(!order){
        res.status(400)
        throw new Error('Order doesnot exist')
    }

    if(order.user.toString() !== req.user.id){
        res.status(400)
        throw new Error('User doesnot exist')
    }


    if(orderStatus === "cancel"){
    order.orderStatus = orderStatus || order.orderStatus;
    }else {
        res.status(400).json('Sorry U cant change the status')
    }
    

    for(let item of order.items){
        await Product.updateOne(
            { _id: item.product},
            { $inc: { stock: item.quantity } }
        )
    }
    await order.save();

    res.status(200).json(order);

})


//Admin Controller

const getAllOrder = asynchandler(async(req,res) =>{
//get All Orders include reference of the user and the other data

    const order = await Order.find().populate("address");
    if(!order) {
        res.status(400)
        throw new Error("Order doesnot Exist")
    }

    res.status(200).json(order)

})


const getSingleOrder = asynchandler(async(req,res) =>{
//get single order according to their object id

    const getorder = await Order.findById(req.params.id)
    if(!getorder) {
        res.status(400)
        throw new Error("Order doesnot Exist")
    }

    res.status(200).json(getorder)

})



module.exports = {postOrder,getOrder,getoneOrder,cancelOrder,getAllOrder,getSingleOrder}
