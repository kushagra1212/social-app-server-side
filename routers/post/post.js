const express=require('express');
const router=express.Router();
const postfun=require('./postfun');


router.post('/uploadpost',postfun.uploadpost);
router.get('/getpost',postfun.getpost);
router.get('/getposts',postfun.getposts);
router.patch('/updatelikes',postfun.updatelikes);
router.delete('/deletelike',postfun.deletelike)
module.exports=router;