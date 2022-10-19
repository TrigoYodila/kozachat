import React from 'react'
import {Link} from 'react-router-dom'
import './sidebar.css'
import profileuser from '../../Assets/images/user.png'
import { useStateValue } from '../../reducers/StateProvider'


const Sidebar = ({user}) => {

  //  const [{ user }] = useStateValue();
   console.log("sidebar-user",user)

  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <div className="user-image">
          <img src={profileuser} alt="" />
          <p>pathy</p>
        </div>
        <div className="user-icons"></div>
      </div>
      <div className="sidebar-logout"></div>
    </div>
  );
}

export default Sidebar
