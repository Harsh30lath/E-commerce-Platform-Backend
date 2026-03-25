const express = require('express');
const app = express();
const userRoutes = require('./Routes/userRoutes')
const addressRoutes = require('./Routes/addressRoutes')
const dotenv = require('dotenv').config();
const connectDB = require('./Config/DBconnect')

connectDB();
app.use(express.json())


app.use('/api/user',userRoutes)
app.use('/api/user',addressRoutes)

app.listen(5000, () =>{
    console.log('Server is Serving at Port 5000')
})