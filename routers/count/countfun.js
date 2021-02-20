const  Count=require('../../Model/count');
module.exports.setcount=async(req,res)=>{
    const {username}=req.body;
    try{
        const count= new Count({
username:username
        });
        await count.save();
        if(count)
        {
            res.send(count);
        }else{
            res.send({err:"err"})
        }

    }catch(err)
    {
        res.status(500).send(err);
    }

}

module.exports.updatepostcount=async(req,res)=>{
    const {postcount,username}=req.body;
  
    try{
        
    const count=await Count.findOne({username:username});
    if(count)
    {
        count.postcount=postcount;
        await count.save();
   
        res.send(count);
    }
    }catch(err)
    {
        res.status(500).send(err);
    }


}