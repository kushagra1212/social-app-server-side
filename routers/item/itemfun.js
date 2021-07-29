const { response } = require('express');
const item = require('../../Model/item');
const Item =require('../../Model/item');
module.exports.setstart=async(req,res)=>{
    const {username}=req.body;
    try{
          const item=await Item({
              username:username
          });
          await item.save();
          if(item)
          {
              res.send(item);
          }else{
              res.status(400).send({err:"err"});
          }

    }catch(err)
    {
        res.status(500).send(err);
    }
    


}
module.exports.updatefollowerandfollowing=async(req,res)=>{
    const {username,usernameofsender}=req.body;
    let count;
    try{
        const item=await Item.findOne({username:usernameofsender});
      
            item.following=[...item.following,{"username":username}];
           count=item.following.length;
            await item.save();
          
  
    }catch(err)
    {
        res.status(500).send(err);
    }
    try{
        const itm=await Item.findOne({username:username});
      
            itm.followers=[...itm.followers,{"username":usernameofsender}];
          
            await itm.save();
     
    }catch(err)
    {
        res.status(500).send(err);
    }
    res.send({followingcount:count});

}
module.exports.verifiesusers=async(req,res)=>{
    const {username,usernameofsender}=req.query;

try{
    if(username!=undefined && usernameofsender!=undefined)
    {
        const item=await Item.find({username:username});

        const found=item[0].followers.find(ele=>ele.username==usernameofsender);
        if(found)
        {
            res.send({found:true});
        }else{
            res.send({found:false})
        }
    }
   
}catch(err)
{
    res.status(500).send(err);
}
   

}

module.exports.getitem=async(req,res)=>{
    const {username}=req.query;
    try{
        const item=await Item.findOne({username:username})
        if(item)
        {
            res.send(item);
        }else{
            res.status(404).send({msg:"NOT FOUND"})
        }
    }catch(err)
    {
        res.send(500).send(err);
    }
}