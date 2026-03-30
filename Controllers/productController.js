const Category = require('../Models/categoryModel');
const Product = require('../Models/productModel');
const asynchandler = require('express-async-handler');

const readProduct = asynchandler(async(req,res) =>{
    const read = await Product.find();
    if(!read){
        res.status(400);
        throw new Error('Product doesnot exist!')
    }

    res.status(200).json(read);

})

const SearchProduct = asynchandler(async(req,res) =>{
    let product;
    if (req.query.brand) {
    product = await Product.find({
        brand: { $regex: req.query.brand, $options: "i" }
    });
    } else if (req.query.name) {
    product = await Product.find({
        name: { $regex: req.query.name, $options: "i" }
    });
    }

    if (!product || product.length === 0){
        res.status(400);
        throw new Error('Product cannot be find')
    }

    res.status(200).json(product);
    
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

module.exports = {createProduct,readProduct,readoneProduct,updateProduct,deleteProduct, SearchProduct}