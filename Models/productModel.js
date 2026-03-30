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
    }
}
,{
    timestamps: true
})

productModel.index({ brand: 1 });
productModel.index({ name: 1 });

module.exports = mongoose.model('Product',productModel)