import React, { useEffect, useState } from "react";
import "../conversation/conversation.css";
import Messages from "../../Messages";
import InputEmoji from "react-input-emoji";
// import { getUser } from "../../../../serveur/Controllers/AuthControllers";
import { getaUser } from "../../api/UserRequest";
import userContext from "../Protected/userContext";
import { useStateValue } from "../../reducers/StateProvider";
import profileuser from '../../Assets/images/user.png'

const Conversation = ({ conversation, currentUserId }) => {

  const [{ user }] = useStateValue();

  const [userData, setUserData] = useState(null);
  
  console.log("conver data", conversation)
  console.log("current user Id conversation", currentUserId)
  console.log("user data clicked", userData)

  useEffect(() => {
    const userId = conversation?.participants?.find(
      (id) => id !== currentUserId
    );
      console.log("mon user Id", userId)
    const getUserData = async () => {
      try {
        const { data } = await getaUser(userId);
        setUserData(data);
        console.log("donnée protegé", data);
      } catch (error) {
        console.log(error);
      }
    };

    if (conversation !== null) getUserData();
  }, [conversation, currentUserId]);

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <div className="follower">
          <div>
            <img src={profileuser} alt=""  style={{ width: "50px", height: "50px" }}/>
            <div className="name">
              <span>{userData?.username}</span>
              <span>online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="conversation-body">
        {Messages.map((message, index) => (
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
