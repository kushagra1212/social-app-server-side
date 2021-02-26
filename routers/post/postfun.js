const Post=require('../../Model/Post'); 
const User=require('../../Model/user')
module.exports.uploadpost=async(req,res)=>{
  const {username,picture,desc}=req.body;
  const post =new Post({
      username:username,
      picture:picture,
      desc:desc,
    
  });
  try{
      await post.save();
      res.send(post);
  }catch(err){
      console.log(err)
      res.send({err:"error occured in the server"});
  }



}

module.exports.getpost=async(req,res)=>{
    const {id}=req.query;

 try{
    const user=await User.findById({_id:id});
    const posts=await Post.find({username:user.username}).limit(5);
       res.send(posts);
     
 }catch(err){
     console.log(err);
     res.status(404).send(err)
 }
    
}
module.exports.getposts=async(req,res)=>{
    const {username}=req.query;

 try{
    const user=await User.findOne({username:username});
    const posts=await Post.find({username:user.username}).limit(5);
       res.send(posts);
     
 }catch(err){
     console.log(err);
     res.status(404).send(err)
 }
    
}