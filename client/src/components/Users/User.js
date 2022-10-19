import React,{useContext, useEffect, useState} from 'react'
import './user.css'
import userContext from '../Protected/userContext';
import { getaUser } from "../../api/UserRequest";
import profileuser from "../../Assets/images/user.png";

const User = (data,online) => {
  const { currentUserId } = useContext(userContext);
  const [userData, setUserData] = useState(null);

  console.log("data user", data.data);
  console.log("current user", currentUserId);
  
  useEffect(() => {
    const userId = data?.data?.participants?.find((id) => id !== currentUserId);
    // console.log("userId", userId);
    // console.log("participants", conversation.participants);

    const getUserData = async () => {
      try {
        const { data } = await getaUser(userId);
        setUserData(data);
        console.log("trouvé ", data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div className='conversation-user'>
          {online && <div className="online-dot"></div>}
          <img
            src={profileuser}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "1rem" }}>
            <span>{userData?.username}</span>
            {/* <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default User
