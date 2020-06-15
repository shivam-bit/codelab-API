const mongoose= require('mongoose')
const questionSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:[true,"subject is must"],
    },
    question:{
        type:String,
        required:[true,"question statement is must"]
    },
    input_format:{
        type:String
    },
    output_format:{
        type:String
    },
    expected_input:{
        type:String
    },
    expected_output:{
        type:String
    },
    explanation:{
        type:String
    } 
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
// virtual test cases
questionSchema.virtual('Testcases',{
    ref:'testcasesDB',
    localField:'_id',
    foreignField:'question',
    justOne:false
})
questionSchema.virtual('Submissions',{
    ref:'submissionsDB',
    localField:'_id',
    foreignField:'question_id',
    justOne:false
})
module.exports=mongoose.model('questionsDB',questionSchema)