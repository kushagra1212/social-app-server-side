const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
        conversationID:{
                type:String,
                require:true
        },
        sender:{
                type:String,
                require:true
        },
        text:{
                type:String,
                require:true
        },timestamps:{
                type:Boolean,
                default:true
        }
       

})

module.exports=mongoose.model('message',messageSchema);