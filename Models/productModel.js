const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true
    },

    brand:{
        type:String,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    size:{
        type: [String],
        required: true
    },

    gender: {
        type: String,
        enum: ["men", "women", "unisex", "kids"],
        required: true
    }
}
,{
    timestamps: true
})

productModel.index({gender: 1, name: 1 , brand: 1})

module.exports = mongoose.model('Product',productModel)