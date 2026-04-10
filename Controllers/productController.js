const Category = require('../Models/categoryModel');
const Product = require('../Models/productModel');
const asynchandler = require('express-async-handler');

const readProduct = asynchandler(async(req,res) =>{
    try {
        const { search,sortBy , order, brand, minPrice, maxPrice} = req.query;

        let filter = {};
        if(search){
            filter.name= {$regex : search,$options: "i"}
        }

        if(brand){
            filter.brand ={$regex : brand ,$options: "i"}
        }

        if(minPrice || maxPrice){
            filter.price = {};
            if(minPrice ) filter.price.$gte = Number(minPrice)
            if(maxPrice ) filter.price.$lte = Number(maxPrice)
        }

        let sortOption = {};
        const sortOrder = order === "asc" ? 1:-1;
        if(sortBy === "price"){
            sortOption.price = sortOrder
        } else if (sortBy === "name"){
            sortOption.name = sortOrder
        } else if(sortBy === "brand"){
            sortOption.brand = sortOrder
        } else {
            sortOption.createdAt = -1;
        } 

        const read = await Product.find(filter).sort(sortOption);
        if(!read){
            res.status(400);
            throw new Error('Product doesnot exist!')
        }
    
        res.status(200).json(read);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    
    }

})



const readoneProduct = asynchandler(async(req,res) =>{
    const readOne = await Product.findById(req.params.id);
    if(!readOne){
        res.status(400);
        throw new Error('Product doesnot exist!')
    }

    res.status(200).json(readOne);
    
})

const createProduct = asynchandler(async(req,res) =>{
    const { name , price , category, brand, stock, size} = req.body;

    if(!name||!price||!category||!brand||!stock||!size){
        res.status(400);
        throw new Error('Please fill all details of the product');
    }

    
    const categoryDoc = await Category.findById(category)

    if (!categoryDoc) {
        res.status(404);
        throw new Error("Category not found");
    }

    const create = await Product.create({
        name,
        price,
        category: categoryDoc._id,
        brand,
        stock,
        size
    });
    
    res.status(201).json(create)
})

const updateProduct = asynchandler(async(req,res) =>{
    const { name , price , brand, stock, size} = req.body;
    const update = await Product.findById(req.params.id);

    if(!update){
        res.status(400);
        throw new Error('Product Doesnot exist');
    }

    update.name = name||update.name;
    update.price = price||update.price;
    update.brand = brand||update.brand;
    update.stock = stock||update.stock;
    update.size = size||update.size;
    
    const updated = await update.save();

    res.status(201).json(updated)

})

const deleteProduct = asynchandler(async(req,res) =>{
    const delPro = await Product.findById(req.params.id)
        
            if(!delPro){
                res.status(401);
                throw new Error('Address doesnot exist')
            }
        
           await Product.findByIdAndDelete(req.params.id);
        
            res.status(200).json('Deleted Successfully')
        
    
})

module.exports = {createProduct,readProduct,readoneProduct,updateProduct,deleteProduct}