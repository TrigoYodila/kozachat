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
import { io } from "socket.io-client";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Contact from "../Contact/Contact";

const Protected = () => {
  const navigate = useNavigate();

  // const userdatacontext = useContext(userContext);
  const socket = useRef();

  const [{ user }] = useStateValue();
  console.log("my user", user);

  const [conversation, setConversation] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentConversation, setCurrentConversation] = useState(null);
  const [currentConversationcontact, setCurrentConversationContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [clickedLink, setClickedLink] = useState(false)

  // console.log("mes conversations", conversation);
  console.log("CURRENT CONVESATION", currentConversation)

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

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

  console.log("online users ", onlineUsers);

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
    // console.log("Online executé", conversation.participants)
    const chatMember = conversation.participants.find(
      (member) => member !== user._id
    );
    console.log("chat member", chatMember);
    // console.log("Chat Member", onlineUsers);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    console.log("ONLINE OFF", online);
    // return online ? false : true;
    if (online === undefined) {
      console.log("pas en ligne");
      return false;
    } else {
      console.log("en ligne");
      return true;
    }
  };

  // console.log("user current Id", currentUserId)
  return (
    <div className="chat-container">
      <userContext.Provider value={{ user, conversation, currentUserId }}>
        <Sidebar
          user={user}
          clickedLink={clickedLink}
          setClickedLink={setClickedLink}
        />

        <div className="user-container">
          <div className="user-search">
            <span>
              <FiSearch size={18} />
            </span>
            <input type="text" placeholder="Search" />
            <span>
              <BsThreeDotsVertical size={15} color="#1966ff" />
            </span>
          </div>

          <div className="recent-user-info">
            <h1>{clickedLink === false ? "Recent" : "Contacts"}</h1>
            {clickedLink === false ? (
              conversation.map((conversation) => {
                const isOnline = checkOnlineStatus(conversation);
                return (
                  <div
                    onClick={() => {
                      setCurrentConversation(conversation);
                    }}
                  >
                    <User data={conversation} online={isOnline} />
                  </div>
                );
              })
            ) : (
              <Contact
                // conversation = {conversation}
                setCurrentConversation={setCurrentConversation}
                checkOnlineStatus={checkOnlineStatus}
                currentConversation={currentConversation}
              />
            )}
          </div>
        </div>

        <Conversation
          conversation={currentConversation}
          currentUserId={currentUserId}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
          messages = {messages}
          setMessages = {setMessages}
        />
      </userContext.Provider>
    </div>
  );
};

export default Protected;
