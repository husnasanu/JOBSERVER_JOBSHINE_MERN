const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    console.log(req);
    const {username,email,password} = req.body
    console.log(username,email,password);
    //check email is present in mongodb
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            //already user
            res.status(406).json("Account already exist!! Please login...")
        }else{
            //register user
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    }catch(err){
        res.status(401).json(err)
    }
}

// login logic
exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    // get userdetails from req body
    const {email,password} = req.body
    console.log(email,password);
    // check email & password in user model
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
        //    allow login
        // generate token using jwt
         const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
        res.status(200).json({
            user:existingUser,
            token
        })
        }else{
            // 
            res.status(404).json("Invalid emmail/password")
        }
    }catch(err){
        console.log(res.status(401).json(err));
        
    }
    
    
}