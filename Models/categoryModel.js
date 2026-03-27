const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({

    name: {
    type: String,
    required: true
    },

    slug: {
    type: String,
    unique: true
    }

},{
    timestamps: true
})

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    Category: {
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

    size:[{
        type: String,
        required: true
    }]
}
,{
    timestamps: true
})


module.exports = mongoose.model('Product',productModel)
module.exports = mongoose.model('Category',categoryModel)