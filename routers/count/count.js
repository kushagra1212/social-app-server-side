const express=require('express');
const router=express.Router();
const countfun=require('./countfun');

router.post('/setcount',countfun.setcount)
router.patch('/updatepostcount',countfun.updatepostcount);
router.patch('/updatefollowingcount',countfun.updatefollowingcount);
router.patch('/updatefollowerscount',countfun.updatefollowerscount);
router.patch('/increasepostcount',countfun.increasepostcount);
router.patch('/decreasepostcount',countfun.decreasepostcount);
router.get('/getpostcount',countfun.getpostcount);
module.exports=router;