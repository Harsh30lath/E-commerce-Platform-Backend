const mongoose = require('mongoose')

const addressModel = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

    street:{
        type:String,
        required:[true,"Street is required"],
        trim: true
    },

    city:{
        type:String,
        required:[true,"City is required"],
        trim: true
    },

    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^\d{6}$/, "Please enter a valid pincode"], // India format
    },

    country:{
        type:String,
        required:[true,"Street is required"],
        trim: true,
        default: 'India'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Address", addressModel)