const mongoose=require('mongoose')
const testcaseSchema=new mongoose.Schema({
    input:{
        type:String,
        required:[true,"testcase requires input"]
    },
    output:{
        type:String,
        required:[true,"testcase requires output"]
    },
    question:{
        type:mongoose.Schema.ObjectId,
        ref:'questionsDB',
        required:[true,"question id is must "]
    }
})
module.exports=testcaseSchema
module.exports=mongoose.model('testcasesDB',testcaseSchema)