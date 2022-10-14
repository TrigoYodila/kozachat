const ConversationModel = require('../Models/conversationModel');

const createConversation = (req,res) => {
    const newConversation = new ConversationModel({
        participants:[req.body.senderId,req.body.receverId],
    })

    newConversation.save()
    .then((result)=>{
        res.status(200).json(result)
    }).catch(error=>{
        res.status(500).json(error)
    })

}

const userConversations = (req,res) => {
    ConversationModel.find({participants:[req.params.userId]})
    .then(chat=>{
        res.status(200).json(chat)
    }).catch(error=>{
        res.status(500).json(error)
    })
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