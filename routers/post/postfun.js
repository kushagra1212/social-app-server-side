const Post=require('../../Model/Post'); 
const User=require('../../Model/user')
const firebase =require("../firebase/firebase.js");
const axios =require('axios');
const getImageToken=async (originalname)=>{
   try{
    const res=await axios.get(`https://firebasestorage.googleapis.com/v0/b/eimentum.appspot.com/o/${originalname}`);
    if(res.data)
    {
       return res.data.downloadTokens;
    }
   }catch(err)
   {
     console.log(err);

   }
}
module.exports.uploadpost=async(req,res)=>{

if(!req.file) {
      return  res.status(400).send("Error: No files found")
}
else{
    const blob = firebase.bucket.file(req.file.originalname)
        
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    }); 
    blobWriter.on('error', (err) => {
        console.log(err)
    })
    
    blobWriter.on('finish', async () => {
      const token=await getImageToken(req.file.originalname);
      
  const {username,desc}=req.query;
  const post =new Post({
      username:username,
      picture:`https://firebasestorage.googleapis.com/v0/b/eimentum.appspot.com/o/${req.file.originalname}?alt=media&token=${token}`,
      desc:desc
    
  });
  try{
      await post.save();
      res.send(post);
  }catch(err){
      console.log(err)
      res.send({err:"error occured in the server"});
  }
    })
    
    blobWriter.end(req.file.buffer);
}



}

module.exports.getpost=async(req,res)=>{
    const {id}=req.query;

 try{
    const user=await User.findById({_id:id});
    const posts=await Post.find({username:user.username});
       res.send(posts);
     
 }catch(err){
     console.log(err);
     res.status(404).send(err)
 }
    
}
module.exports.getposts=async(req,res)=>{
    const {username,limit,last}=req.query;
    try{
    const posts=await Post.find({username:username}).sort({'createdAt':-1}).skip(parseInt(last)).limit(parseInt(limit));

    if(posts)
   {
    res.send(posts);
   }
 }catch(err){
     console.log(err);
     res.status(404).send(err);
 }
    
}
module.exports.updatelikes=async(req,res)=>{
     const {username,id}=req.query;
     try{
         const post=await Post.findById(id);
         if(post){
         post.likes=[...post.likes,{"username":username}];
         await post.save();
         res.send(post);
         }else{
             res.send("post not found");
         }
     }catch(err)
     {
         console.log(err);
         res.status(404).send(err);
     }}
module.exports.deletelike=async(req,res)=>{
    const {id,username}=req.query;
    try{
     const post=await Post.findByIdAndUpdate(id,{$pull:{'likes':{username:username}}},(err,doc)=>{
         if(err)
         {
             console.log(err);
            
             res.status(404).send(err);
         }
      
         res.send(doc);
     })
    
    }
    catch(err)
    {
        console.log(err);
        res.sensd(err);
    }
}
module.exports.addcomments=async(req,res)=>{
    const {id,username,comment}=req.query;
  
    try{
        const post=await Post.findById(id)
        if(post)
        {
            post.comments=[...post.comments,{"username":username,"comment":comment}];
            await post.save();
            res.send(post);
        }else{
            res.status(404).send({"Error":"Post Not Found"});
        }

    }catch(err)
    {
        console.log(err);
        res.status(500).send(err);

    }
}