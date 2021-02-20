const express=require('express');
const router=express.Router();
const postfun=require('./postfun');


router.post('/uploadpost',postfun.uploadpost);
router.get('/getpost',postfun.getpost);



module.exports=router;