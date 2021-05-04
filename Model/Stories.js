const mongoose=require('mongoose');


const StoriesSchema=new mongoose.Schema({
    username:{
        type:String
    },
    picture:{
        type:Array
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600
    },
    started:{
        type:Boolean,
        default:false
    }

})

module.exports=mongoose.model('Stories',StoriesSchema);