const express=require('express');
const router=express.Router();
const countfun=require('./countfun');

router.post('/setcount',countfun.setcount)
router.patch('/updatepostcount',countfun.updatepostcount);
module.exports=router;