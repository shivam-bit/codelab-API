const express=require('express')
const router=express.Router()
const { isAuthenticatedUser }=require('../middlewares/authMiddleware')

const { judge }=require('../controllers/judgeController')
const { plag }=require('../controllers/plagirismController')

router.route('/judge').post(isAuthenticatedUser,judge)
router.route('/plag').post(plag)
module.exports=router