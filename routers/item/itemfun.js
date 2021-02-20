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