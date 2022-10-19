import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Conversation from "../conversation/Conversation";
import Sidebar from "../Sidebar/Sidebar";
import User from "../Users/User";
import "./protected.css";
import { useStateValue } from "../../reducers/StateProvider";
import { userConversation } from "../../api/ConversationRequest";
import userContext from "./userContext";

const Protected = () => {
  const navigate = useNavigate();

  // const userdatacontext = useContext(userContext);

  const [{ user }] = useStateValue();
  console.log("my user", user);

  const [conversation, setConversation] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentConversation, setCurrentConversation] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

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
  }, []);

  const checkOnlineStatus = (conversation) => {
    const chatMember = conversation.participants.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

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
                <Conversation
                  data={conversation}
                  currentUser={user._id}
                  online={checkOnlineStatus(conversation)}
                />
              </div>
            ))}
          </div>
          <User />
        </div>

        <Conversation />
      </userContext.Provider>
    </div>
  );
};

export default Protected;
