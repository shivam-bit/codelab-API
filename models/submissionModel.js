const mongoose= require('mongoose')
const submissionSchema=new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.ObjectId,
        ref:'Question',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:[true,"user is must"]
    }

})
module.exports=mongoose.model('submissionsDB',submissionSchema)