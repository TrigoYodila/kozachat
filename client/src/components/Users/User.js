import React, { useContext, useEffect, useState } from 'react'
import './user.css'
import userContext from '../Protected/userContext'
import { getaUser } from '../../api/UserRequest'
import profileuser from '../../Assets/images/user.png'

// eslint-disable-next-line react/prop-types
function User({ data, online }) {
  const { currentUserId } = useContext(userContext)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const userId = data?.participants?.find((id) => id !== currentUserId)

    const getUserData = async () => {
      try {
        // eslint-disable-next-line no-shadow
        const { data } = await getaUser(userId)
        setUserData(data)
      } catch (error) {
        // error
      }
    }
    getUserData()
  }, [])

  return (
    <>
      <div className="follower conversation">
        <div className="conversation-user">
          {online && <div className="online-dot"> </div>}
          <img
            src={profileuser}
            alt="Profile"
            className="followerImage"
            style={{ width: '70px', height: '70px' }}
          />
          <div className="name" style={{ fontSize: '1rem' }}>
            <span>{userData?.username}</span>
            <small>last message</small>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default User
