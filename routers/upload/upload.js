const express=require('express');
const router=express.Router();
const uploadfun=require('./uploadfun');
router.post('/image',uploadfun.uploadimage);

module.exports=router;