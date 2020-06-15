const questionsDB=require('../models/questionModel')
const testcasesDB=require('../models/testcaseModel')
const submissionsDB=require('../models/submissionModel')
const catchAsyncError=require('../middlewares/catchAsyncError')
const errorHandlerClass=require('../utils/errorHandlerClass')
const axios=require('axios')
const hooke = require("hookejs")

exports.judge=catchAsyncError(async(req,res,next)=>{
    const testcases=await testcasesDB.find({question:req.body.qid})
    var testcasesPassed=0
    for(var i=0;i<testcases.length;i++){
        const expected_output=testcases[i].output
        var payload = {
            script : req.body.source ,
            language: req.body.language ,
            stdin:testcases[i].input,
            versionIndex: "0",
            clientId: "69a0e37cd6fe7210a4a05dbbf4f9ee29",
            clientSecret:"6b565c6be83c03b9838966f9369d5223083ce9da258c3c1818ec23f4fde57bee"
        };

        await axios({
            method:'post',
            url:'https://api.jdoodle.com/v1/execute',
            headers:{
                "content-type": "application/json",
                "accept": "application/json",
                "useQueryString": true
            },
            data:JSON.stringify(payload)
        }).then(function (response) {
            const input_got=(response.data.output).slice(0, -1)
            // console.log((expected_output)==(input_got))
            if (expected_output==input_got){
                testcasesPassed++;
            }
          })
    }
    if (testcasesPassed===testcases.length){
        const data=await hooke.match({text: req.body.source})
        const details={
            "question_id":req.body.qid,
            "user":req.user.id,
            "name":req.user.name
        }
        submissionsDB.create(details)
        res.status(200).json({
            success:true,
            score:data.length
        })
    }else{
        res.status(200).json({
            success:false
        })
    }
    
})
