import React from "react";
import "../conversation/conversation.css";
import Messages from "../../Messages";
import InputEmoji from "react-input-emoji";

const Conversation = () => {
  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <div className="follower">
          <div>
            <img src="" alt="" />
            <div className="name">
              <span>Trigo</span>
              <span>online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="conversation-body">
        {Messages.map((message) => (
          <div className={message.senderId === 1 ? "message own" : "message"}>
            <span>{message.text}</span>
            <span>Bonjour</span>
          </div>
        ))}
      </div>

      <div className="conversation-sender">
        <div>+</div>
        <InputEmoji
        // value={}
        // onChange={handleChange}
        />
        <div className="send-button button">envoyer</div>
        <input type="file" name="" id="" />
      </div>
    </div>
  );
};

export default Conversation;