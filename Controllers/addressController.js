const asynchandler = require('express-async-handler');
const Address = require('../Models/addressModel')

const addAddress = asynchandler(async(req,res) => {
    const {street,city,state,pincode,country } = req.body;

    if(!street ||!city ||!state ||!pincode ||!country ){
        res.status(400);
        throw new Error("Please enter all required Fields!!");
    }

    const create = await Address.create({
        user: req.user.id,
        street,city,state,pincode,country
    })

    res.status(201).json({
        create
    })
})



const getAddress = asynchandler(async(req,res) =>{
    const user = await Address.find({user: req.user.id});
    if(!user){
        res.status(401);
        throw new Error('User doesnot exist')
    }

    res.status(201).json(user);

})

const oneAddress = asynchandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }

  // ownership check
  if (address.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  res.status(200).json(address);
});

const updateAddress = asynchandler(async(req,res) => {
    const {street,city,state,pincode,country} =req.body;

    const address = await Address.findById(req.params.id)
    if(!address){
        res.status(401);
        throw new Error('Address doesnot exist')
    }

    if(address.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User doesnot exist')   
    }

    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.pincode = pincode || address.pincode;
    address.country = country || address.country;

    const userAddress = await address.save()

    res.status(200).json(userAddress)


})

const deleteAddress = asynchandler(async(req,res) =>{
    const address = await Address.findById(req.params.id)

    if(!address){
        res.status(401);
        throw new Error('Address doesnot exist')
    }

    if(address.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User doesnot exist')   
    }

   await Address.findByIdAndDelete(req.params.id);

    res.status(200).json('Deleted Successfully')
})

module.exports = {addAddress,getAddress,updateAddress,deleteAddress,oneAddress};