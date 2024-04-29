const express= require('express');
const {config} = require('dotenv')
const mongoose= require('mongoose')
const bodyParser= require('body-parser')
config()

const userRoutes= require('./routes/crud.routes')

const app= express()
app.use(bodyParser.json())

const port= process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Escuchando en el Puerto: ${port}`);
})