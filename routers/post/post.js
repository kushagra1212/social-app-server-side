const express=require('express');
const router=express.Router();
const postfun=require('./postfun');


router.post('/uploadpost',postfun.uploadpost);
router.get('/getpost',postfun.getpost);
router.get('/getposts',postfun.getposts);


module.exports=router;