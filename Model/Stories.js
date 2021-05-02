const mongoose=require('mongoose');


const StoriesSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true
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

module.export=mongoose.model('Stories',StoriesSchema);