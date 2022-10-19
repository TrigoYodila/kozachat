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

  return (
    <div className="chat-container">
      <userContext.Provider value={{user,conversation,currentUserId}}>
        <Sidebar user={user} />
        <User />
        <Conversation conversation={conversation} currentUserId={user._id} />
      </userContext.Provider>
    </div>
  );
};

export default Protected;
