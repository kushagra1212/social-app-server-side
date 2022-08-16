const mongoose=require('mongoose');


const StoriesSchema=new mongoose.Schema({
    username:{
        type:String
    },
    picture:{
        type:String
    },
    profilepic:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:30600
    }

})

module.exports=mongoose.model('Stories',StoriesSchema);