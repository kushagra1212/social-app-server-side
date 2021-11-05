const express=require('express');
const router=express.Router();
const postfun=require('./postfun');
const multer=require('multer');
const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/uploadpost', upload.single('file'),postfun.uploadpost);
router.post('/addpost',postfun.addpost);
router.get('/getpost',postfun.getpost);
router.get('/getposts',postfun.getposts);
router.get('/userpost/:id',postfun.getpostbyid);
router.patch('/updatelikes',postfun.updatelikes);
router.delete('/deletelike',postfun.deletelike);
router.patch('/addcomment',postfun.addcomments);
router.delete('/deleteuserpost/:id',postfun.deleteUserPost);
module.exports=router;