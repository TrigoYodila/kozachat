/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import profileuser from '../../Assets/images/user.png'
import userContext from '../Protected/userContext'
import '../Users/user.css'
import { getaAllUsers } from '../../api/UserRequest'
import { useStateValue } from '../../reducers/StateProvider'
import { findSpecifiqueConversation } from '../../api/ConversationRequest'

function Contact({
  setCurrentConversation,
  // eslint-disable-next-line no-unused-vars
  conversation,
}) {
  const [{ user }] = useStateValue()
  const { currentUserId } = useContext(userContext)
  const [allUsersData, setAllUsersData] = useState(null)
  const [getdata, setGetData] = useState(false)

  // const [allUsersData, setAllUsersData] = useState(null);

  // console.log("courant conversation", currentConversation);
  // console.log("current user contact contact", currentConversation);
  // console.log("current user", user._i)

  useEffect(() => {
    const getUserData = async () => {
      try {
        // eslint-disable-next-line prettier/prettier
        const { data } = await getaAllUsers(user._id);
        setAllUsersData(data)
        setGetData(true)
      } catch (error) {
        // error
      }
    }
    getUserData()
  }, [])

  const UserInConversation = async (user) => {
    try {
      const { data } = await findSpecifiqueConversation(currentUserId, user._id)
      setCurrentConversation(data)
    } catch (error) {
      // error
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {getdata
        // eslint-disable-next-line arrow-body-style
        && allUsersData.map((user) => {
          return (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              onClick={() => {
                UserInConversation(user)
              }}
            >
              <div className="follower conversation">
                <div className="conversation-user">
                  {/* {online && <div className="online-dot"></div>} */}
                  <img
                    src={profileuser}
                    alt="Profile"
                    className="followerImage"
                    // eslint-disable-next-line prettier/prettier
                    style={{ width: '70px', height: '70px' }}
                  />
                  <div className="name" style={{ fontSize: '1rem' }}>
                    <span>{user?.username}</span>
                    <small>last message</small>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          )
        })}
    </>
  )
}

export default Contact
