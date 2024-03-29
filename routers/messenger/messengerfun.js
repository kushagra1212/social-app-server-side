const conversationModel = require('../../Model/conversationModel');
const messageModel = require('../../Model/messageModel');
module.exports.addconversation = async (req, res) => {
  const { members } = req.body;

  if (members.length === 0) {
    return res.status(400).send({ mesage: 'NO Users' });
  }
  try {
    const Conversation = new conversationModel({
      members: members,
    });

    await Conversation.save();
    res.send(Conversation);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports.getconversation = async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).send({ mesage: 'NO Users' });
  }

  try {
    const conversations = await conversationModel.aggregate([
      {
        $match: {
          members: { $in: [username] },
        },
      },
      {
        $addFields: {
          chatWith: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$members',
                  as: 'member',
                  cond: { $ne: ['$$member', username] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'chatWith',
          foreignField: 'username',
          as: 'chatWithUser',
        },
      },
    ]);
    res.send(conversations);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

module.exports.deleteconversation = async (req, res) => {
  const { members } = req.body;

  if (members.length === 0) {
    return res.status(400).send({ mesage: 'NO Users' });
  }
  try {
    const docs = await conversationModel.deleteOne({ members: members });
    res.send(docs);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports.addmessage = async (req, res) => {
  const mess = req.body;

  if (!mess) {
    return res.status(400).send({ mesage: 'No Conversation Found !' });
  }

  try {
    const Message = new messageModel(mess);
    await Message.save();

    res.send(Message);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports.getmessages = async (req, res) => {
  const conversationID = req.params.conversationID;

  if (!conversationID) {
    return res.status(400).send({ mesage: 'ERROR Invalid ConversationID!' });
  }
  try {
    const messages = await messageModel.find({
      conversationID: conversationID,
    });
    res.send(messages);
  } catch (err) {
    res.send(err);
  }
};
