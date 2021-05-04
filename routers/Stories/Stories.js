const express =require('express');
const router=express.Router();
const Storiesfun=require('./Storiesfun');
router.post('/uploadimage',Storiesfun.uploadimage);
router.patch('/updatestories',Storiesfun.updatestories);
router.get('/getstarted',Storiesfun.getstarted);
module.exports=router;