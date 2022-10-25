const mongoose = require('mongoose')
const express = require('express')
const boydparser = require('body-parser')
const app = express()
const PORT = 8010
const MONGO_URL = 'mongodb://localhost:27017/zomato'
const routes = require('./routes/Restaurant')
app.use(boydparser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use("/", routes)
mongoose.connect(MONGO_URL, () => { console.log("MongoDB Started successfully"); })
app.listen(PORT, () => { console.log(`The server is startd on the PORT : ${PORT}`); })