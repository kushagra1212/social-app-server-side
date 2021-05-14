const mongoose=require('mongoose');


const StoriesSchema=new mongoose.Schema({
    username:{
        type:String
    },
    picture:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600
    }

})

module.exports=mongoose.model('Stories',StoriesSchema);