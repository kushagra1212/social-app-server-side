const express=require('express');
const router=express.Router();
const itemfun =require('./itemfun');

router.post('/setstart',itemfun.setstart);
module.exports=router;