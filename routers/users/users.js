const express=require('express');
const router=express.Router();
const usersfun =require('./usersfun');

router.get('/getuser',usersfun.getuser);

module.exports=router;