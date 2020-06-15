hooke = require("hookejs")
const catchAsyncError=require('../middlewares/catchAsyncError')
exports.plag=catchAsyncError(async(req,res,next)=>{
    // plagiarisedText = `Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/ or /-ˈhoʊlmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Referring to himself as a "consulting detective" in the stories, Holmes is known for his proficiency with observation, deduction, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.`
    plagiarisedText="node.js is a async"
    const data=await hooke.match({text: plagiarisedText})
    res.status(200).json({
        success:true,
        data:data.length
    })

})
