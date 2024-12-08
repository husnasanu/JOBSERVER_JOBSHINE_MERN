const mongoose = require("mongoose")

const addJobSchema = new mongoose.Schema({
    cName:{
        type:String,
        required:true
    },
    cEmail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    lDate:{
        type:Date,
        required:true
    }
})

const jobs = mongoose.model("jobs",addJobSchema)
module.exports = jobs
