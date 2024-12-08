const mongoose = require("mongoose")
const dbConnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(res=>{
    console.log("Mongodb Atlas Connected Successfully with jsServer !!!");
    
}).catch(err=>{
    console.log("Connection Failed!!!");
    console.log(err);

})