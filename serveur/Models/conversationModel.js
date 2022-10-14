const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema(
  {
    participants: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model("conversation", ConversationSchema);
module.exports = ConversationModel;