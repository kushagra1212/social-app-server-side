const mongoose =require('mongoose');
const countSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    followerscount:{
        type:Number,
        default:0
    },
    followingcount:{
      type:Number,
      default:0
    },
    postcount:{
        type:Number,
        default:0
    }
})



module.exports=mongoose.model('Count',countSchema);