const mongoose=require('mongoose');
const {isEmail }=require('validator');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
       validate:[
         isEmail,
       'Email is not valid']
    },
    name:{
        type:String,
        required:[true,'Name is required'] 
    },
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[6,'password should be of minimum length 6']
    }
});




module.exports=mongoose.model('User',userSchema);