const ConversationModel = require('../Models/conversationModel');

const createConversation = (req,res) => {

    const {senderId,receverId} = req.body;
    
    ConversationModel.findOne({
      $or: [
        { senderId, receverId },
        { receverId, senderId},
      ],
    }).then((result)=>{
        if(result !== null){
            res.status(400).json({
                message:"conversation existe"
            })
        }else{
          const newConversation = new ConversationModel({
                participants: [senderId,receverId]
              });
              newConversation
                .save()
                .then((result) => {
                  res.status(200).json({
                    message: "conversation created",
                    result,
                  });
                })
                .catch((error) => {
                  res.status(500).json(error);
                });
        }
    })

}
const userConversations = (req,res) => {
    ConversationModel.find({
      participants: { $in: [req.params.userId] },
    })
      .then((chat) => {
        res.status(200).json(chat);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
}

const findConversation = (req,res) => {
    ConversationModel.findOne({
        participants : {$all:[req.params.firstId,req.params.secondId]}
    }).then(chat=>{
        res.status(200).json(chat)
    })
    .catch(error=>{
        res.status(500).json(error)
    })
}

module.exports = { createConversation, userConversations, findConversation };