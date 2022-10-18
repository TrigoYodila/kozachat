import React from 'react'
import {Link} from 'react-router-dom'
import './sidebar.css'
// import profile from '../../images/logo192.png'
import { useStateValue } from '../../reducers/StateProvider'


const Sidebar = () => {

   const [{authUser}] = useStateValue();
   console.log(authUser)

  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <div className="user-image">
          <img src="" alt="" />
          <p>{authUser.username}</p>
        </div>
        <div className="user-icons"></div>
      </div>
      <div className="sidebar-logout"></div>
    </div>
  );
}

export default Sidebar
