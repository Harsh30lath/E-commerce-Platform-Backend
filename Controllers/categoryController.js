const asynchandler = require("express-async-handler");
const Category = require('../Models/categoryModel');

//Only Admin
const createCat = asynchandler(async(req,res) =>{
    const {name,slug} = req.body;
    if(!name || !slug){
        res.status(400);
        throw new Error('Please enter all Valid field')
    }

    const create = await Category.create({
        name,slug
    })

    res.status(200).json(create);
})

const readCat = asynchandler(async(req,res) =>{
    const read = await Category.find()
    if(!read){
        res.status(400);
        throw new Error('Category doesnot exist!')
    }

    res.status(200).json(read);
})

const readoneCat = asynchandler(async (req, res) => {

    const readOne = await Category.findById(req.params.id)
    if(!readOne){
        res.status(400);
        throw new Error('Category doesnot Exist!')
    }

    res.status(201).json(readOne);

});

const SearchCat = asynchandler(async(req,res) =>{
    let category;
    if(req.query.slug){
    category = await Category.find({
        slug: {$regex: req.query.slug, $options:'i'}
    })
    }else if(req.query.name){
    category = await Category.find({
        name: { $regex: req.query.name, $options: "i" }
    })
    }

    if(!category){
        res.status(400);
        throw new Error('Category doesnot Exist!')
    }

    res.status(201).json(category);

})

const updateCat = asynchandler(async(req,res) =>{
    const {name,slug} = req.body
    const updateCat = await Category.findById(req.params.id);

    if(!updateCat){
        res.status(400);
        throw new Error('Category doesnot Exist!')
    }

    updateCat.name = name || updateCat.name;
    updateCat.slug = slug || updateCat.slug;
    
    const Updated = await updateCat.save();

    res.status(201).json(
        Updated
    )
})

const deleteCat = asynchandler(async(req,res) =>{
    const delCat = await Category.findById(req.params.id)
    
        if(!delCat){
            res.status(401);
            throw new Error('Address doesnot exist')
        }
    
       await Category.findByIdAndDelete(req.params.id);
    
        res.status(200).json('Deleted Successfully')
    
})

module.exports = {createCat,readCat,readoneCat,updateCat,deleteCat, SearchCat}