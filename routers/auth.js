const express=require('express');
const authfun=require('./authfun');
const router=express.Router();
const User=require('../Model/user');
router.post('/signin',authfun.sign_in);
router.post('/signup',authfun.signup);
router.get('/logout',authfun.logout);
router.get('/verify',authfun.verify);

module.exports=router;