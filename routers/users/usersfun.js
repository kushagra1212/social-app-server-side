const User = require('../../Model/userModel');
const Items_Model = require('../../Model/itemModel');
module.exports.getuser = async (req, res) => {
  const { username } = req.query;
  if (username) {
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ msg: 'user not found' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

module.exports.getusers = async (req, res) => {
  const { limit, last } = req.query;
  try {
    const users = await User.find({})
      .skip(parseInt(last))
      .limit(parseInt(limit));
    res.send(users);
  } catch (err) {
    res.send(err);
  }
};
module.exports.searchuser = async (req, res) => {
  const { username } = req.params;
  try {
    const users = await User.find({
      username: { $regex: username, $options: 'i' },
    });
    res.send(users);
  } catch (err) {
    res.send(err);
  }
};

module.exports.suggestuser = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.send([]);
  try {
    const followingUsers = await Items_Model.aggregate([
      {
        $match: {
          username: username,
        },
      },
      {
        $project: {
          following: 1,
        },
      },
    ]);
    let following = followingUsers[0].following.map((user) => user.username);
    following.push(username);
    const suggestUser = await User.find({
      username: { $nin: following },
    }).limit(6);
    res.send(suggestUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
