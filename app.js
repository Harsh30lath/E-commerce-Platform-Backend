const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./Routes/userRoutes')
const addressRoutes = require('./Routes/addressRoutes')
const categoryRoutes =require('./Routes/categoryRoutes')
const productRoutes = require('./Routes/productRoutes')
const cartRoutes = require('./Routes/cartRoutes')
const orderRoutes = require('./Routes/orderRoutes')
const paymentRoutes = require('./Routes/paymentRoutes');
const connectDB = require('./Config/DBconnect')

connectDB();
app.use(express.json())


app.use('/api/user',userRoutes)
app.use('/api/user',addressRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/payment',paymentRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log('Server is Serving at Port 5000')
}) 