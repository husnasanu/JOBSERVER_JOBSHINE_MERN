// import express cors and dotenv 
const express = require('express')
const cors = require('cors')
// used to load content of .env file in to process.env 
require('dotenv').config()
const router = require('./Routes/router')
require('./DBconnection/connection')

const jsServer =  express()
jsServer.use(cors())
// convert json to js
jsServer.use(express.json()) 
jsServer.use(router)
jsServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

jsServer.listen(PORT,()=>{
    console.log(`jsServer Started at port : ${PORT} and waiting for client request !!!`);
    
})

//  resolving client/browser request (GET/POST/PUT/DELETE) using express
// resolving get request to http://localhost:3000/
jsServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style ="color:red;text-align : center;" > jsServer Started at port : ${PORT} and waiting for client request !!! </h1>`)
})

