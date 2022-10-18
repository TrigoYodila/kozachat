import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Conversation from "../conversation/Conversation";
import Sidebar from "../Sidebar/Sidebar";
import User from "../Users/User";
import "./protected.css";
import { useStateValue } from "../../reducers/StateProvider";

const Protected = () => {
  const navigate = useNavigate();
  const [{ authUser }] = useStateValue();
  console.log(authUser);

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
      <Sidebar />
      <User />
      <Conversation />
    </div>
  );
};

export default Protected;
