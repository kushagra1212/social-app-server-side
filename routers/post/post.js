const express=require('express');
const router=express.Router();
const postfun=require('./postfun');
const multer=require('multer');
const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/uploadpost', upload.single('file'),postfun.uploadpost);
router.get('/getpost',postfun.getpost);
router.get('/getposts',postfun.getposts);
router.patch('/updatelikes',postfun.updatelikes);
router.delete('/deletelike',postfun.deletelike);
router.patch('/addcomment',postfun.addcomments);
module.exports=router;