import axios from "axios";
import React, { useContext, useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Conversation from "../conversation/Conversation";
import Sidebar from "../Sidebar/Sidebar";
import User from "../Users/User";
import "./protected.css";
import { useStateValue } from "../../reducers/StateProvider";
import { userConversation } from "../../api/ConversationRequest";
import userContext from "./userContext";
import { getaUser } from "../../api/UserRequest";
import { io } from 'socket.io-client';

const Protected = () => {

  const navigate = useNavigate();

  // const userdatacontext = useContext(userContext);
  const socket = useRef();

  const [{ user }] = useStateValue();
  console.log("my user", user);

  const [conversation, setConversation] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentConversation, setCurrentConversation] = useState(null);
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([]);


  //send message to socket server
  useEffect(()=>{
    if(sendMessage !== null){
      socket.current.emit('send-message', sendMessage)
    }
  },[sendMessage])

  //receive Message from socket server
  //  useEffect(() => {
  //    socket.current.on("receive-message", (data)=>{
  //     setReceiveMessage(data)
  //    })
  //  }, []);


  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await userConversation(user._id);
        setConversation(data);

        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
    setCurrentUserId(user._id);
    // axios.get(`http://localhost:5000/conversation/${user._id}`)
    // .then(data=>console.log("mes data ", data));
  }, [user._id]);

  // // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/auth/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });

    //receive Message from socket server
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });

  }, []);

  const checkOnlineStatus = (conversation) => {
    const chatMember = conversation.participants.find(
      (member) => member !== user._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // console.log("user current Id", currentUserId)
  return (
    <div className="chat-container">
      <userContext.Provider value={{ user, conversation, currentUserId }}>
        <Sidebar user={user} />

        <div className="user-container">
          <div className="user-search">
            <input type="text" placeholder="Search" />
          </div>
          <h1>Recent</h1>
          <div className="recent-user-info">
            {conversation.map((conversation) => (
              <div
                onClick={() => {
                  setCurrentConversation(conversation);
                }}
              >
                <User
                  data={conversation}
                  online={checkOnlineStatus(conversation)}
                />
              </div>
            ))}
          </div>
        </div>

        <Conversation
          conversation={currentConversation}
          currentUserId={currentUserId}
          setSendMessage={setSendMessage}
          receiveMessage = {receiveMessage}
        />
      </userContext.Provider>
    </div>
  );
};

export default Protected;
