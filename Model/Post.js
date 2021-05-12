const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    username:{
        type:String
    },
    picture:{
        type:String
    },
    desc:{
        type:String,
        maxlength:50
    },
    comments:{
        type:Array
    },
    likes:{
        type:Array,
        items:{
            unique:true
        }

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Post",postSchema);