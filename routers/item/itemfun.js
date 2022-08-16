const { response } = require("express");
const Item = require("../../Model/itemModel");
module.exports.setstart = async (req, res) => {
  const { username } = req.body;
  try {
    const item = await Item({
      username: username,
    });
    await item.save();
    if (item) {
      res.send(item);
    } else {
      res.status(400).send({ err: "err" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.updatefollowerandfollowing = async (req, res) => {
  const { username, usernameofsender } = req.body;
  let count;

  try {
    const item = await Item.findOne({ username: usernameofsender });

    if(item.following.findIndex(ele=>ele.username===username)===-1){
        item.following = [...item.following, { username: username }];
        count = item.following.length;
    }
    await item.save();
    const itm = await Item.findOne({ username: username });

    if(itm.followers.findIndex((ele)=>ele.username===usernameofsender)===-1){
        itm.followers = [...itm.followers, { username: usernameofsender }];
    }

    await itm.save();
    res.send({ followingcount: count });
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.removefollowerandfollowing = async (req, res) => {
  const { username, usernameofsender } = req.body;
  let count;
  const item = await Item.findOne({ username: usernameofsender });

  count = item.following.length;

  Item.updateOne(
    { username: usernameofsender },
    { $pull: { following: { username: username } } },
    { safe: true, multi: true },
    function (err, obj) {
      if (err) {
        res.status(500).send(err);
      }
      Item.updateOne(
        { username: username },
        { $pull: { followers: { username: usernameofsender } } },
        { safe: true, multi: true },
        function (err, obj) {
          if (err) {
            res.status(500).send(err);
          }
          res.send({ followingcount: count });
        }
      );
    }
  );
};
module.exports.verifiesusers = async (req, res) => {
  const { username, usernameofsender } = req.query;

  try {
    if (username != undefined && usernameofsender != undefined) {
      const item = await Item.find({ username: username });

      const found = item[0].followers.find(
        (ele) => ele.username == usernameofsender
      );
      if (found) {
        res.send({ found: true });
      } else {
        res.send({ found: false });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getitem = async (req, res) => {
  const { username } = req.query;
  try {
    const item = await Item.findOne({ username: username });
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ msg: "NOT FOUND" });
    }
  } catch (err) {
    res.send(500).send(err);
  }
};

module.exports.isconnection = async (req, res) => {
  const { currentusername, username } = req.query;
  try {
    const items = await Item.find(
      { username: currentusername },
      { followers: { $elemMatch: { username: username } } }
    );
    if (items[0].followers.length > 0) res.send({ found: true });
    else res.send({ found: false });
  } catch (err) {
    res.send(err);
  }
};
