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


const CategoriesByGender = asynchandler(async (req, res) => {
    const { gender } = req.query;

    const categories = await Product.distinct("category", { gender });

    res.status(200).json(categories);
});



const readoneProduct = asynchandler(async(req,res) =>{
    const readOne = await Product.findById(req.params.id);
    if(!readOne){
        res.status(400);
        throw new Error('Product doesnot exist!')
    }

    res.status(200).json(readOne);
    
})

const createProduct = asynchandler(async(req,res) =>{
    const { name , price ,description, category, brand, stock, gender, size,image} = req.body;

    if(!name||!price|| !description ||!category||!brand||!stock|| !gender||!size){
        res.status(400);
        throw new Error('Please fill all details of the product');
    }

    
    const categoryDoc = await Category.findById(category)

    if (!categoryDoc) {
        res.status(404);
        throw new Error("Category not found");
    }

    if(!req.files || req.files.length === 0){
        res.status(404);
        throw new Error("Please upload images of the Product");
    }

    const imageurls = req.files.map(file=>({
        url:file.location,
        key:file.key
    }))
    
    const create = await Product.create({
        name,
        price,
        description,
        category: categoryDoc._id,
        brand,
        gender,
        stock,
        size,
        image: imageurls
    });
    
    res.status(201).json(create)
})

const updateProduct = asynchandler(async(req,res) =>{
    const { name , price , description, brand, stock, size} = req.body;
    const update = await Product.findById(req.params.id);

    if(!update){
        res.status(400);
        throw new Error('Product Doesnot exist');
    }

    update.name = name||update.name;
    update.price = price||update.price;
    update.description = description||update.description
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

module.exports = {CategoriesByGender,createProduct,readProduct,readoneProduct,updateProduct,deleteProduct}