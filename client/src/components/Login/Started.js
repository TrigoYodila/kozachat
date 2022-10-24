import React from "react";
import { NavLink } from "react-router-dom";
import "./started.css";
// import { banniere } from "../../Assets/images/bannere2.jpg";

const Started = () => {
  return (
    <div className="started-container">
      <div className="started-link">
        <div className="title">
            <h1>KOZACHAT</h1>
            <p>La causerie devient </p>
        </div>
        <div className="link-block">
            <NavLink to="/login" className="link">SE CONNECTER</NavLink>
            <NavLink to="/register" className="secondary">CREER UN COMPTE</NavLink>
        </div>
      </div>
      <div className="started-blour"></div>
    </div>
  );
};

export default Started;
