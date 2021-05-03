const express =require('express');
const router=express.Router();
const Storiesfun=require('./Storiesfun');
router.post('/uploadimage',Storiesfun.uploadimage);
router.patch('/updatestories',Storiesfun.updatestories);
module.exports=router;