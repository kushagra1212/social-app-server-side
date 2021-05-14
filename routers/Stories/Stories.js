const express =require('express');
const router=express.Router();
const Storiesfun=require('./Storiesfun');

router.post('/uploadstories',Storiesfun.uploadstories);
router.get('/getstories',Storiesfun.getstories);

module.exports=router;