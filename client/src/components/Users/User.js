import React from 'react'
import './user.css'

const User = () => {
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
