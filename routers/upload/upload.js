const express = require('express');
const router = express.Router();
const uploadfun = require('./uploadfun');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/image', uploadfun.uploadimage);
router.get('/getuser', uploadfun.getuser);
router.post('/updateuser', uploadfun.updateuser);

module.exports = router;
