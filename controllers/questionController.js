const questionsDB=require('../models/questionModel')
const testcasesDB=require('../models/testcaseModel')
const subjectDB=require('../models/subjectModel')
const catchAsyncError=require('../middlewares/catchAsyncError')
const errorHandlerClass=require('../utils/errorHandlerClass')

exports.addQuestion=catchAsyncError(async(req,res,next)=>{
    const question=await questionsDB.create(req.body)
    res.status(200).json({
        success:true,
        data:question
    })
})
exports.viewQuestion=catchAsyncError(async(req,res,next)=>{
    const question=await questionsDB.findById(req.params.questionId)
        .populate({
            path:'Testcases',
            select:'input output'
        })
        .populate({
            path:'Submissions',
            select:'user name'
        })
    // console.log(question)
    res.status(200).json({
        success:true,
        data:question
    })
})
exports.addTestcase=catchAsyncError(async(req,res,next)=>{
    const questionPresent=await questionsDB.findById(req.params.questionId)
    if (!questionPresent){
        return next(new errorHandlerClass("question not found ",401))
    }
    req.body.question=req.params.questionId
    const testcase=await testcasesDB.create(req.body)
    res.status(200).json({
        success:true,
        data:testcase
    })
})

exports.viewAllQuestion=catchAsyncError(async (req,res,next)=>{
    const subjectExist=await subjectDB.find({subject_name:req.params.subject})
    if (subjectExist.length===0){
        return next(new errorHandlerClass("subject not found ",401))
    }
    const Questions=await questionsDB.find({subject:req.params.subject})
    res.status(200).json({
        success:true,
        data:Questions
    })
})
exports.viewAllTestcases=catchAsyncError(async(req,res,next)=>{
    const testcases=await testcasesDB.find({question:req.params.qid})
    res.status(200).json({
        success:true,
        data:testcases
    })
})