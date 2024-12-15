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

// profile updation logic autherization required
exports.editProfileController = async (req,res)=>{
    console.log("Inside editProfileController");
    const {username,email,password,phno,linkedin,profilePic} = req.body
    const uploadImg = req.file?req.file.filename:profilePic
    const userId = req.userId
    try{
      const updateUser = await users.findByIdAndUpdate({_id:userId},{
        username,email,password,phno,linkedin,profilePic:uploadImg
      },{new:true})
      await updateUser.save()
      res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
    
}
// get users with Authentication
// exports.getUserController = async (req,res)=>{
//     console.log("Inside getUserController");
//     const userId = req.userId
//     try{
//       const allUsers = await users.find({userId})
//       res.status(200).json(allUsers)
//     }catch(err){
//         res.status(401).json(err)
        
//     }
    
// }
// delete User By Admin

// Get users with authentication
exports.getUserController = async (req, res) => {
    console.log("Inside getUserController");
    const userId = req.userId;
    
    try {
      // Exclude users with role of 'admin'
      const allUsers = await users.find({ userId, role: { $ne: 'Admin' } });
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  
exports.removeUserController = async (req,res)=>{
    console.log("Inside removeUserController");
    const {jid} = req.params
    try {
        
        const removeUser = await users.findByIdAndDelete({_id:jid})
        res.status(200).json(removeUser)
    
    } catch (err) {
       res.status(401).json(err) 
    }
    }
