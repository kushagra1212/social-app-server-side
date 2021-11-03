const express=require('express');
const router=express.Router();
const itemfun =require('./itemfun');

router.post('/setstart',itemfun.setstart);
router.patch('/updatefollowerandfollowing',itemfun.updatefollowerandfollowing);
router.get('/verifiesusers',itemfun.verifiesusers);
router.get('/getitem',itemfun.getitem);
router.get('/isconnection',itemfun.isconnection);
module.exports=router;