import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './started.css'
// import { banniere } from "../../Assets/images/bannere2.jpg"

function Started() {
  const navigate = useNavigate()
  const handleRegister = () => {
    navigate('/register', { state: { value: 'true', clicked: true } })
  }
  return (
    <div className="started-container">
      <div className="started-link">
        <div className="title">
          <h1>KOZACHAT</h1>
          <p>Chatez en temps réel avec vos correspondants.</p>
        </div>
        <div className="link-block">
          <NavLink to="/login" className="link">
            SE CONNECTER
          </NavLink>
          <button type="submit" className="secondary" onClick={handleRegister}>
            CREER UN COMPTE
          </button>
        </div>
      </div>
      <div className="started-blour"> </div>
    </div>
  )
}

export default Started
