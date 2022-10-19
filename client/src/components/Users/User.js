import React,{useContext, useEffect, useState} from 'react'
import './user.css'
import userContext from '../Protected/userContext';
import { getaUser } from "../../api/UserRequest";

const User = () => {

  const { conversation, currentUserId } = useContext(userContext);
  const [userData, setUserData] = useState(null);
  console.log("conver data id", currentUserId);

  useEffect(()=>{
    const userId = conversation.participants?.find(
      (id) => id !== currentUserId
    );
    // console.log("userId", userId);

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
  },[])


  return (
    <div className="user-container">

      <div className="user-search">
        <input type="text" placeholder="Search" />
      </div>

      <div className="recent-user">
        <h1>Recent</h1>
      </div>
    </div>
  )
}

export default User
