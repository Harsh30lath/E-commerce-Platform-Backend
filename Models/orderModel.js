const mongoose = require('mongoose')

const OrderModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    address: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
        required : true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "Product", 
                required: true
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],
    amount:{
        type:Number,
        required:true
    },
    orderStatus: {
        type: String,
        enum: ["placed", "confirmed", "shipped", "delivered", "cancel"],
        default: "placed"
    },
    paymentMethod: { 
        type: String, 
        default: "COD" 
    }, 
    paymentStatus: { 
        type: String, 
        enum: ["pending", "paid"], 
        default: "pending" 
    }

},{
    timestamps : true
})

module.exports = mongoose.model('Order',OrderModel)