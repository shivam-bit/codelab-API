const mongoose= require('mongoose')
const subjectSchema=new mongoose.Schema({
    subject_name:{
        type:String,
        required:[true,"subject is must"]
    }
})
module.exports=mongoose.model('subjectsDB',subjectSchema)