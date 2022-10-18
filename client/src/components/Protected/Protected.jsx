import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Conversation from "../conversation/Conversation";
import Sidebar from "../Sidebar/Sidebar";
import User from "../Users/User";
import "./protected.css";
import { useStateValue } from "../../reducers/StateProvider";
import { userConversation } from "../../api/ConversationRequest";

const Protected = () => {
  const navigate = useNavigate();

  const [{ user }] = useStateValue();
  // console.log("my user", user.data.user._id);

  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await userConversation(user.data.user._id);
        setConversation(data);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
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
      <Sidebar user={user} />
      <User />
      <Conversation
        conversation={conversation}
        currentUserId={user?.data?.user?._id}
      />
    </div>
  );
};

export default Protected;
