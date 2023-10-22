const express=require('express');
const authfun=require('./authfun');
const router=express.Router();
const User=require('../Model/userModel');
router.post('/signin',authfun.sign_in);
router.post('/signup',authfun.signup);
router.post('/logout',authfun.logout);
router.get('/verify',authfun.verify);

module.exports=router;