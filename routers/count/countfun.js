const Count = require("../../Model/countModel");
const Item = require("../../Model/itemModel");
module.exports.setcount = async (req, res) => {
  const { username } = req.body;
  try {
    const count = new Count({
      username: username,
    });
    await count.save();
    if (count) {
      res.send(count);
    } else {
      res.send({ err: "err" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.updatepostcount = async (req, res) => {
  const { postcount, username } = req.body;
   try {
    let count = await Count.findOne({ username: username });
    if (count) {
      count.postcount = postcount;
      await count.save();

      res.send(count);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.increasepostcount=async(req,res)=>{
    const {username}=req.body;
    try{
        let count=await Count.findOne({username:username});
        if(count){
            count.postcount++;
            await count.save();
            res.send(count);
        }
    }catch(err){
        console.log(err);
    }
    
}
module.exports.decreasepostcount=async(req,res)=>{
    const {username}=req.body;
    try{
        let count=await Count.findOne({username:username});
        if(count){
            count.postcount--;
            await count.save();
            res.send(count);
        }
    }catch(err){
        console.log(err);
    }
    
}
module.exports.updatefollowingcount = async (req, res) => {
  const { username } = req.body;
  try {
    const count = await Count.findOne({ username: username });
    const item = await Item.findOne({ username: username });
    if (count && item) {
      count.followingcount = item.following.length;
      await count.save();
      res.send(count);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.updatefollowerscount = async (req, res) => {
  const { username } = req.body;
  try {
    const count = await Count.findOne({ username: username });
    const item = await Item.findOne({ username: username });
    if (count && item) {
      count.followerscount = item.followers.length;
      await count.save();
      res.send(count);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getpostcount = async (req, res) => {
  const { username } = req.query;

  try {
    const count = await Count.findOne({ username: username });
    if (count) {
      res.send(count);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
