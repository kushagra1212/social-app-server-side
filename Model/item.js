const mongoose=require('mongoose');
const itemSchema=mongoose.Schema({
    username:{
type:String,
unique:true
    },
    followers:{
        type:Array
    },following:{
        type:Array
    }
})


module.exports=mongoose.model('Item',itemSchema);