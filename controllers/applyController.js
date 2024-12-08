const jobList = require('../Models/applicationModel')

// add logic
exports.applyJobController = async (req,res)=>{
    console.log("inside applyJobController");
    console.log(req.userId);  
    const {Name,title,cName,gender,qualification,passout,cgpa,currRole,experience,currCTC,expCTC,skills,status} =  req.body
     console.log(Name,title,cName,gender,qualification,passout,cgpa,currRole,experience,currCTC,expCTC,skills,status);
     console.log(req.file.filename);
     try{
        const newApplication = new jobList({
            Name,title,cName,gender,qualification,passout,cgpa,currRole,experience,currCTC,expCTC,skills,resume:req.file.filename,userId:req.userId,status
        })
        await newApplication.save()
        res.status(200).json(newApplication)

    }catch(err){
        res.status(401).json(err)
    }
}

// get user applied job with Authentication
exports.getUserJobController = async (req,res)=>{
    console.log("Inside getUserAppliedJobController");
    const userId = req.userId
    try{
      const allUserAppliedJobs = await jobList.find({userId})
      res.status(200).json(allUserAppliedJobs)
    }catch(err){
        res.status(401).json(err)
        
    }
    
}

// delete Added Jobs By Admin

exports.removeapplicationController = async (req,res)=>{
    console.log("Inside removeapplicationController");
    const {jid} = req.params
    try {
        
        const removeAppliedJob = await jobList.findByIdAndDelete({_id:jid})
        res.status(200).json(removeAppliedJob)
    
    } catch (err) {
       res.status(401).json(err) 
    }
    }

    // all Project  Authentication requred
    exports.getAllApplicationController = async (req,res)=>{
        console.log("Inside getAllApplicationController");
        try{
          const allApplcations = await jobList.find()
          res.status(200).json(allApplcations)
        }catch(err){
            res.status(401).json(err)
            
        }
        
    }
    
