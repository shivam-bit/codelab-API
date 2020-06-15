const mongoose= require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name"]
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
        validate:[validator.isEmail,"email id not valid"]
    },
    course:{
        type:String,
        enum:{
            values:['MCA','BCA'],
            message:"ONLY FOR BCA AND MCA STUDENTS"
        },
        // default:'customer'
    },
    roll:{
        type:Number,
        required:[true,"Please enter the middle part of your roll no. "]
    },
    year_of_admission:{
        type:Number,
        required:[true,"Please enter year of your admission"]
    },
    password:{
        type:String,
        require:[true,"please enter password for your account"],
        minlength:[6,"your password should be at-least 6 characters long"],
        select:false
    },
    role:{
        type:String,
        enum:{
            values:['student','teacher'],
            message:"please select correct role"
        },
        default:'student'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
// encrypting password before saving
usersSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10)
})


// returning json web token
usersSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
// compare user password with db password
usersSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

usersSchema.virtual('Submissions',{
    ref:'submissionsDB',
    localField:'_id',
    foreignField:'user',
    justOne:false

})

module.exports=mongoose.model('usersDB',usersSchema)