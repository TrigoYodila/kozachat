const MessageModel = require("../Models/messageModel");

const addMessage = (req, res) => {
  const { conversationId, senderId, content } = req.body;
  const message = new MessageModel({
    conversationId,
    senderId,
    content,
  });

  message
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const getMessage = (req, res) => {
  const { conversationId } = req.params;

  MessageModel.find({ conversationId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = { addMessage, getMessage };
