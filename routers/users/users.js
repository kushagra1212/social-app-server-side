const express = require('express');
const router = express.Router();
const usersfun = require('./usersfun');

router.get('/getuser', usersfun.getuser);
router.get('/getusers', usersfun.getusers);
router.get('/searchuser/:username', usersfun.searchuser);
router.get('/suggestuser/:username', usersfun.suggestuser);
module.exports = router;
