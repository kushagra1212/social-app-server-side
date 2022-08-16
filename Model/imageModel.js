const mongoose =require('mongoose');
const imageSchema=new mongoose.Schema({
    img:{
      type:String
    }
})


module.exports=mongoose.model('image',imageSchema);