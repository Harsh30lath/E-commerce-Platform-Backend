const mongoose = require('mongoose')

const cartModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }
]},{
    timestamps:true
})

module.exports = mongoose.model('Cart',cartModel)