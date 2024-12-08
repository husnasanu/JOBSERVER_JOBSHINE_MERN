
const jobs = require('../Models/addJobModel')

// add logic
exports.addJobController = async (req,res)=>{
    console.log("inside addJobController");
    // console.log(req.userId);  
    const {cName,cEmail,title,qualification,description,experience,lDate} =  req.body
    
    console.log(cName,cEmail,title,qualification,description,experience,lDate);
    try{
        const newJob = new jobs({
            cName,cEmail,title,qualification,description,experience,lDate
        })
        await newJob.save()
        res.status(200).json(newJob)

    }catch(err){
        res.status(401).json(err)
    }
}

// get add Admin Added jobs in dashboard
exports.getAddedJobController = async(req,res)=>{
    console.log("Inside getAddedJobController by Admin in Dashboard");
    try{
        const adminJobs = await jobs.find({})
        res.status(200).json(adminJobs)
    }catch(err){
        res.status(401).json(err)
    }    
}

// delete Added Jobs By Admin

exports.removeJobController = async (req,res)=>{
    console.log("Inside removeJobController");
    const {jid} = req.params
    try {
        
        const removeJob = await jobs.findByIdAndDelete({_id:jid})
        res.status(200).json(removeJob)
    
    } catch (err) {
       res.status(401).json(err) 
    }
    }

    // Edit Jobs by Admin
    exports.editJobController = async (req,res)=>{
        console.log("inside Edit job Controller");
        const {jid} =req.params
        const {cName,cEmail,title,qualification,description,experience,lDate} = req.body
        const userId = req.userId
        try {
            const updateJob=  await jobs.findByIdAndUpdate({_id:jid},
                {
                    cName,cEmail,title,qualification,description,experience,lDate,userId
                },{new:true} )
                await updateJob.save()
                res.status(200).json(updateJob)
        } catch (err) {
            res.status(401).json(err)
        }
        
    }

    // get  Admin Added jobs in userhome
exports.getJobUserhomeController = async(req,res)=>{
    console.log("Inside getJobUserhomeController by user in userhome");
    try{
        const adminaddedJobs = await jobs.find({})
        res.status(200).json(adminaddedJobs)
    }catch(err){
        res.status(401).json(err)
    }    
}
    