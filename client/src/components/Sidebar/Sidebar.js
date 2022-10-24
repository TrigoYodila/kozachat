import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import profileuser from "../../Assets/images/user.png";
import { useStateValue } from "../../reducers/StateProvider";
import { BsChatDotsFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { RiLogoutCircleRFill } from "react-icons/ri";

const Sidebar = ({ clickedLink, setClickedLink }) => {
  const [{ user }] = useStateValue();

  console.log("sidebar-user", user);

  const handleClicked = () => {
    setClickedLink(false)
  }

  const handleClickedContact = () => {
    setClickedLink(true);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <div className="user-image">
          <img src={profileuser} alt="" />
          <p>{user?.username}</p>
        </div>

        <div className="user-icons-container">
          <div className={clickedLink === false ? "user-icons active" : "user-icons"} onClick={handleClicked}>
            <div className="right-bar"></div>
            <span className="message-icon">
              <BsChatDotsFill />
            </span>
          </div>
          <div className={clickedLink === true ? "user-icons active" : "user-icons"} onClick={handleClickedContact}>
            <div className="right-bar"></div>
            <span className="message-icon">
              <BsPersonCircle />
            </span>
          </div>
        </div>
      </div>
      <div className="sidebar-logout">
        <span>
          <RiLogoutCircleRFill />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
