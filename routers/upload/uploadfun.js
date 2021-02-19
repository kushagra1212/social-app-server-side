const image=require('../../Model/image');
const path=require('path');
const User=require('../../Model/user');
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
  console.log(user);
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
  const {profilepic,email,username,_id,bio}=req.body;
console.log(req.body)
  try{
    const user=await User.findById({_id})
    user.profilepic=profilepic;
    user.email=email;
    user.username=username;

user.bio=bio;
    await user.save();
    console.log(user);
if(user) res.status(201).send(user)
else res.status(404).send("NOT FOUND");
  }catch(err)
  {
     res.status(500).send(err);
  }

}

