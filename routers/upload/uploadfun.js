const image=require('../../Model/imageModel');
const path=require('path');
const User=require('../../Model/userModel');
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

module.exports.uploadimage=async(req,res)=>{
  const base64=req.body.base64;
  
 try{
   const img=new image({
     img:base64
   })
   await img.save();
   res.send(img);

  
 }catch(err)
 {
     res.send({msg:err})
 }
}


module.exports.getuser=async(req,res)=>{
  const id=req.query.id;
 
  try{

const user=await User.findById(id)
if(user)
{

  res.status(200).send(user);

}else{
res.status(404).send({msg:"NOT FOUND"})
}
  }catch(err)
  {
    res.status(500).send(err);

  }
  
}
module.exports.updateuser=async(req,res)=>{
  const {profilepic,email,username,_id,bio}=req.query;
 
if(!req.file)
{
  try{
    const user=await User.findById({_id})
    user.profilepic=profilepic;
    user.email=email;
    user.username=username;

user.bio=bio;
  try{
    await user.save();
    if(user) res.status(201).send(user)
else res.status(404).send();
  }catch(err) {
    res.status(411).send({msg:"word Limit is 80 "});
  }
    

  }catch(err)
  {
     res.status(500).send(err);
  }

}else{
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
    try{
      const user=await User.findById({_id})
      user.profilepic=`https://firebasestorage.googleapis.com/v0/b/eimentum.appspot.com/o/${req.file.originalname}?alt=media&token=${token}`;
      user.email=email;
      user.username=username;
  user.bio=bio;
    try{
      await user.save();
      if(user) res.status(201).send(user)
  else res.status(404).send();
    }catch(err) {
      res.status(411).send({msg:"word Limit is 80 "});
    }
      
  
    }catch(err)
    {
       res.status(500).send(err);
    }
  
  });
  blobWriter.end(req.file.buffer);
}
 

}



