const Stories =require('../../Model/Stories');
module.exports.uploadimage=async(req,res)=>{
    const {username,base64}=req.body;
    try{
       const stories=new Stories({
           username:username,
           picture:base64
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