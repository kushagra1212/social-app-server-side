const mongoose=require('mongoose');

const conversationSchema=new mongoose.Schema({
        members:{
                type:Array,
                require:true
        }
},  {
        timestamps: true,
    });

module.exports =mongoose.model('conversation',conversationSchema)
