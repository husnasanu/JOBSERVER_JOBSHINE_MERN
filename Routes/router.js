
express = require('express')
const userController = require('../controllers/userController')
const jobController = require('../controllers/jobController')
const applyController  = require('../controllers/applyController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()

// register : post request to http://localhost:3000/register
router.post('/register',userController.registerController)
// register : post request to http://localhost:3000/login
router.post('/login',userController.loginController)
//add job POST request to http://localhost:3000/add-job
router.post('/dashboard',jobController.addJobController)

//get all admin addeddjobs: get request to http://localhost:3000/user-jobs
router.get('/get-Jobs',jobController.getAddedJobController)
// remove project : get request to http://localhost:3000/remove-job
router.delete('/:jid/remove-job',jobController.removeJobController) 

// edit project : put request to http://localhost:3000/edit-job
router.put('/:jid/edit-job', jobController.editJobController);
//get user job get request to http://localhost:3000/get-All-Jobs
router.get('/get-All-Jobs',jobController.getJobUserhomeController)
//add job application request to http://localhost:3000/applicationFormrouter.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)
router.post('/applicationForm',jwtMiddleware,multerMiddleware.single('resume'),applyController.applyJobController)
//get user Appliedjobs get request to http://localhost:3000/get-applied-Jobs
router.get('/get-applied-Jobs',jwtMiddleware,applyController.getUserJobController)
// remove project : get request to http://localhost:3000/remove-application
router.delete('/:jid/remove-application',applyController.removeapplicationController) 
//get user job get request to http://localhost:3000/get-All-Jobs
router.get('/userview',applyController.getAllApplicationController)
// edit user :put request to  http://localhost:3000/user/edit
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editProfileController)
// edit project : put request to http://localhost:3000/:jid/edit-status
router.put('/:jid/edit-status', applyController.editStatusController);
//get user Appliedjobs get request to http://localhost:3000/get-applied-Jobs
router.get('/statusView',jwtMiddleware,applyController.getUserJobStatusController)



module.exports = router
