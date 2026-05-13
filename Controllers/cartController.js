const asynchandler = require('express-async-handler');
const Cart = require('../Models/cartModel');
const Product = require('../Models/productModel');

const addCart = asynchandler(async (req, res) => {
  const { product: productId, quantity } = req.body;
 
  if (!productId ) {
    res.status(400);
    throw new Error("Please provide productId");
  }

  const productExists = await Product.findById(productId);
  if (!productExists) {
    res.status(400);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: []
    });
  }

  const existingItem = cart.items.find(
    item => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.items.push({
      product: productId,
      quantity: Number(quantity)
    });
  }

  await cart.save();

  res.status(200).json({cart});
});


const getCart = asynchandler(async(req,res) =>{
    const cart = await Cart.findOne({user:req.user.id})
    .populate({path:"items.product",select:"name price"})
    
    if(!cart){
        res.status(400);
        throw new Error('User Doesnot Exist')
    }

    res.status(200).json(cart)
})

const updateQuantity = asynchandler(async(req,res) =>{
    const {product:productId,quantity} = req.body
    const cart = await Cart.findOne({user: req.user.id})
    if(!cart){
        res.status(400);
        throw new Error('Cart doesnot exist Please create one')
    }

    const existingProduct = await Product.findById(productId);
    if(!existingProduct){
        res.status(400);
        throw new Error('Product doesnot exist')
    }

    const item = cart.items.find(
    item => item.product.toString() === productId
    );

    

    item.quantity = quantity || item.quantity;

    res.status(200).json(cart);

    
})


const removeCart = asynchandler(async(req,res) =>{
    const { product : productId} = req.body
    const cart = await Cart.findOne({user: req.user.id})
    
    const itemExists = cart.items.find(
        item => item.product.toString() === productId
    );

    if (!itemExists) {
        res.status(404);
        throw new Error("Item not found in cart");
    }
    
    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    )

    await cart.save();

    res.status(200).json("Deleted Successfully")
})

module.exports = {addCart,getCart,updateQuantity,removeCart}