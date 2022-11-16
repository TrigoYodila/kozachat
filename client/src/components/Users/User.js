import React, { useContext, useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import './user.css'
import userContext from '../Protected/userContext'
import { getaUser } from '../../api/UserRequest'
import { getMessages } from '../../api/MessagesRequest'
import profileuser from '../../Assets/images/user.png'
// eslint-disable-next-line react/prop-types

function User({ data, online }) {
  const { currentUserId } = useContext(userContext)
  const [userData, setUserData] = useState(null)
  const [lastMessage, setLastMessage] = useState('')
  const [isloading, setIsLoading] = useState(true)

  // console.log('USER DATA', userData)
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

  // Fetch for get last message in conversation
  const takeMessages = () => {
    // eslint-disable-next-line no-underscore-dangle
    getMessages(data._id)
      .then((chat) => {
        // console.log('MO N CHAT', chat.data)
        setLastMessage(chat.data[chat.data.length - 1].content)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('error ', error)
      })
      .finally(() => setIsLoading(false))
  }

  if (data !== null) takeMessages()

  return (
    <>
      <div className="follower conversation">
        <div className="conversation-user">
          {online && <div className="online-dot"> </div>}
          {isloading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={70}
              height={55}
            />
          ) : (
            <img
              src={
                userData?.profilepicture !== null
                  ? userData?.profilepicture
                  : profileuser
              }
              alt="Profile"
              className="followerImage"
              style={{ width: '70px', height: '70px' }}
            />
          )}
          <div className="name" style={{ fontSize: '1rem' }}>
            {isloading ? (
              <Skeleton
                animation="wave"
                height={20}
                width="40%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              <span>{userData?.username}</span>
            )}
            {isloading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              <small>
                {lastMessage?.length < 15 ? lastMessage : `${lastMessage}...`}
              </small>
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default User
