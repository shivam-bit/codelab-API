const express=require('express')
const router=express.Router()
const { isAuthenticatedUser }=require('../middlewares/authMiddleware')

const { addQuestion,addTestcase,viewQuestion,viewAllQuestion,viewAllTestcases }=require('../controllers/questionController')

router.route('/add-question').post(isAuthenticatedUser,addQuestion)
router.route('/:questionId/add-testcase').post(isAuthenticatedUser,addTestcase)
router.route('/view-question/:questionId').get(isAuthenticatedUser,viewQuestion)
router.route('/:subject/viewAll').get(isAuthenticatedUser,viewAllQuestion)
router.route('/:qid/view-testcases').get(isAuthenticatedUser,viewAllTestcases)

module.exports=router