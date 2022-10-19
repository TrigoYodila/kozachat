import React,{useContext, useEffect, useState} from 'react'
import './user.css'
import userContext from '../Protected/userContext';
import { getaUser } from "../../api/UserRequest";

const User = (data, currentUser,online) => {

  // const { conversation, currentUserId } = useContext(userContext);
  const [userData, setUserData] = useState(null);

  // console.log("conver data id", currentUserId);
  // console.log("conversation participants", data);

  useEffect(() => {

    const userId = data.participants?.find(
      (id) => id !== currentUser
    );
    console.log("userId", userId);
    // console.log("participants", conversation.participants);

    // const getUserData = async () => {
    //   try {
    //     const { data } = await getaUser(userId);
    //     setUserData(data);
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src=""
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span></span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default User
