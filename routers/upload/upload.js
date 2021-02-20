const express=require('express');
const router=express.Router();
const uploadfun=require('./uploadfun');
router.post('/image',uploadfun.uploadimage);
router.get('/getuser',uploadfun.getuser);
router.patch('/updateuser',uploadfun.updateuser);
router.patch('/updateusercount',uploadfun.updateusercount);
module.exports=router;