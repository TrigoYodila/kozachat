import React, { useEffect, useState, useRef } from "react";
import "../conversation/conversation.css";
import Messages from "../../Messages";
import InputEmoji from "react-input-emoji";
// import { getUser } from "../../../../serveur/Controllers/AuthControllers";
import { getaUser } from "../../api/UserRequest";
import userContext from "../Protected/userContext";
import { useStateValue } from "../../reducers/StateProvider";
import profileuser from "../../Assets/images/user.png";
import { getMessages } from "../../api/MessagesRequest";
import { format } from "timeago.js";
import { addMessage } from "../../api/MessagesRequest";

const Conversation = ({ conversation, currentUserId, setSendMessage,receiveMessage }) => {
  const [{ user }] = useStateValue();

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log("conver data", conversation);
  console.log("current user Id conversation", currentUserId);
  console.log("user data clicked", userData);


  useEffect(()=>{

    if(receiveMessage !== null && receiveMessage.conversationId === conversation._id )
    setMessages((prev) => [...prev, receiveMessage])
  },[receiveMessage])



  //get Data for header
  useEffect(() => {
    const userId = conversation?.participants?.find(
      (id) => id !== currentUserId
    );
    console.log("mon user Id", userId);
    const getUserData = async () => {
      try {
        const { data } = await getaUser(userId);
        setUserData(data);
        // console.log("donnée protegé", data);
      } catch (error) {
        console.log(error);
      }
    };

    if (conversation !== null) getUserData();
  }, [conversation, currentUserId]);

  //Fecth data for messages

  useEffect(() => {
    const takeMessages = async () => {
      try {
        const { data } = await getMessages(conversation._id);
        setMessages(data);
        console.log("messages data", data);
      } catch (error) {
        console.log(error);
      }
    };

    if (conversation !== null) takeMessages();
  }, [conversation]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUserId,
      content: newMessage,
      conversationId: conversation._id,
    };

    //send message to database

    try {
      const { data } = await addMessage(message);
      setMessages((prev) => [...prev, data]);
      setNewMessage("");

    } catch (error) {
      console.log("error");
    }

    //send message to socket server
    const receverId = conversation.participants.find((id)=> id !== currentUserId)
    setSendMessage({...message, receverId})

  };

  return (
    <div className="conversation-container">
      {conversation ? (
        <>
          <div className="conversation-header">
            <div className="follower">
              <div>
                <img
                  src={profileuser}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name">
                  <span>{userData?.username}</span>
                  <span>online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="conversation-body">
            {messages.map((message, index) => (
              <div
                className={
                  message.senderId === currentUserId ? "message" : "message own"
                }
              >
                <span>{message.content}</span>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>

          <div className="conversation-sender">
            <div>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend}>
              envoyer
            </div>
            <input type="file" name="" id="" />
          </div>
        </>
      ) : (
        <span className="message-empty">Demarrer une conversation</span>
      )}
    </div>
  );
};

export default Conversation;
