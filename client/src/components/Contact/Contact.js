import React,{useContext, useState,useEffect} from 'react'
import profileuser from "../../Assets/images/user.png"
import userContext from "../Protected/userContext";
import "../Users/user.css";
import { getaAllUsers } from '../../api/UserRequest';
import { useStateValue } from '../../reducers/StateProvider';

const Contact = ({
  currentConversation,setCurrentConversation,
  checkOnlineStatus,
}) => {
  const [{ user }] = useStateValue();
  const { currentUserId } = useContext(userContext);
  const [allUsersData, setAllUsersData] = useState(null);
  const [getdata, setGetData] = useState(false);

  // const [allUsersData, setAllUsersData] = useState(null);

  console.log("all users contact ", allUsersData);
  console.log("current user contact contact", currentConversation);
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getaAllUsers(user._id);
        setAllUsersData(data);
        setGetData(true);
        console.log("All users ", data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      {getdata &&
        allUsersData.map((user) => {
          //   const online = checkOnlineStatus(user)
          return (
            <div
              onClick={() => {
                setCurrentConversation(user);
              }}
            >
              {/* <Contact setAllUsersData={setAllUsersData} allUsersData={allUsersData} online={isOnline}/> */}

              <div className="follower conversation">
                <div className="conversation-user">
                  {/* {online && <div className="online-dot"></div>} */}
                  <img
                    src={profileuser}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "70px", height: "70px" }}
                  />
                  <div className="name" style={{ fontSize: "1rem" }}>
                    <span>{user?.username}</span>
                    {/* <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span> */}
                    <small>last message</small>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
    </>
  );
};

export default Contact
