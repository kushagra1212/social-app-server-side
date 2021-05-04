const Stories =require('../../Model/Stories');
module.exports.uploadimage=async(req,res)=>{
    const {username}=req.body;
    try{
       const stories=new Stories({
           username:username,
           started:true
       });
       await stories.save();
       res.send(stories);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({Error:err});
    }
}

module.exports.updatestories=async(req,res)=>{
    const {_id,picture}=req.body;
  
    try{
         const stories=await Stories.findById(_id);
         if(stories)
         {
             stories.picture=[...stories.picture,{"picture":picture}];
           await stories.save();
           res.send(stories);
         }else{
             res.status(404).send({error:"user not found"});
         }
    }catch(err)
    {
        console.log(err);
        res.status(500).send({err:err});
    }
}
module.exports.getstarted=async(req,res)=>{
    const {username}=req.query;
   
    try{
        const stories=await Stories.findOne({username:username});
    if(stories)
    {

        res.send(stories);
    }else
      {
          res.send({started:false})
      }
    }catch(err)
    {
       res.status(500).send(err);
    }
}