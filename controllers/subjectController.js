const subjectDB=require('../models/subjectModel')
const catchAsyncError=require('../middlewares/catchAsyncError')
const errorHandlerClass=require('../utils/errorHandlerClass')
const sendToken=require('../utils/jwtToken')

exports.addSubject=catchAsyncError(async(req,res,next)=>{
    const alreadyExist=await subjectDB.find({'subject_name':req.body.subject_name})
    if (alreadyExist.length===0){
        const new_subject = await subjectDB.create(req.body)
        res.status(200).json({
            success:true,
            data:new_subject
        })
    }else{
        return next(new errorHandlerClass("subject already exist",401))
    }
})
exports.viewAllSubjects=catchAsyncError(async(req,res,next)=>{
    const allSubjects=await subjectDB.find()
    res.status(200).json({
        success:true,
        data:allSubjects
    })
})