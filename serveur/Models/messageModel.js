const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema(
    {
        conversationId : {
            type:String,
        },
        senderId : {
            type:String
        },
        content:{
            type:String
        },
        attachement:{
            type:Array
        }
    },
    {
        timestamps:true
    }
)

const MessageModel = mongoose.model("message",MessageSchema)
module.exports = MessageModel;