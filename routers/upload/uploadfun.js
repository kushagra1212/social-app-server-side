const image=require('../../Model/image');

module.exports.uploadimage=async(req,res)=>{
  
  
 try{
   const img =new image();
   img.img.data=req.file;
   img.img.contentType='image/png';
   await img.save();
   res.send(img)
 }catch(err)
 {
     res.send({msg:err})
 }
}