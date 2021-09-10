const express=require('express');
const router=express.Router();
const messengerfun=require('./messengerfun')


router.post('/conversation',messengerfun.addconversation);
router.get('/conversation',messengerfun.getconversation);
router.post('/message',messengerfun.addmessage);
router.get('/message/:conversationID',messengerfun.getmessages);
module.exports=router;
