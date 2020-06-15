const express=require('express')
const router=express.Router()
const { isAuthenticatedUser }=require('../middlewares/authMiddleware')

const { addSubject,viewAllSubjects }=require('../controllers/subjectController')

router.route('/add-subject').post(isAuthenticatedUser,addSubject)
router.route('/all-subjects').get(isAuthenticatedUser,viewAllSubjects)
module.exports=router