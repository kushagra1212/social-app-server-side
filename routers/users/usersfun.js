const User =require('../../Model/user');

module.exports.getuser=async(req,res)=>{
    const {username}=req.query;
try{
    const user =await User.findOne({username:username});
    if(user)
    {
        res.send(user);
    }else{
        res.status(404).send({msg:"user not found"})
    }

}catch(err)
{
    res.status(500).send(err);
}


}