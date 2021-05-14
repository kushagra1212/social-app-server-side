const Stories =require('../../Model/Stories');

module.exports.uploadstories=async(req,res)=>{
    const {username,picture}=req.body;
  try{
       const stories=new Stories({
           username:username,picture:picture
       });
       await stories.save();
       res.send(stories);

  }catch(err)
  {
      res.status(500).send({err:err});
      console.log(err);
  }
}
module.exports.getstories=(req,res)=>{
    const {username}=req.query;
   
  
        Stories.find({username:username},(err,docs)=>{
            if(!err)
            {
                res.send(docs);
                
            }else
              {
                  res.status(404).send({msg:"NOT FOUND"});
              }
          
        });
  
  
}