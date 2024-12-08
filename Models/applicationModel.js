const mongoose = require("mongoose")

const applyJobSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    
    title:{
        type:String,
        required:true
    },
    cName:{
        type:String,
        required:true
    },
    
    gender:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    passout:{
        type:String,
        required:true
    },
    cgpa:{
        type:String,
        required:true
    },
    currRole:{
        type:String,
        required:true
    },
    experience:{
        type:String
    },
    currCTC:{
        type:String
    },
    expCTC:{
        type:String
    },

    skills:{
        type:String,
        required:true
    },

    resume:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    }
})

const jobList = mongoose.model("jobList",applyJobSchema)
module.exports = jobList
