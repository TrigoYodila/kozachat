/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import profileuser from '../../Assets/images/user.png'
import userContext from '../Protected/userContext'
import '../Users/user.css'
import { getaAllUsers } from '../../api/UserRequest'
// import { getMessages } from '../../api/MessagesRequest'
import { useStateValue } from '../../reducers/StateProvider'
import {
  findSpecifiqueConversation,
  createConversation,
} from '../../api/ConversationRequest'
// eslint-disable-next-line import/no-named-as-default
import ContactMessage from './ContactMessage'

function Contact({
  setCurrentConversation,
  // eslint-disable-next-line no-unused-vars
  onlineUsers,
  currentConversation
}) {
  const [{ user }] = useStateValue()
  const { currentUserId } = useContext(userContext)
  const [allUsersData, setAllUsersData] = useState(null)
  // const [participantId, setParticipantIdId] = useState(null)
  const [getdata, setGetData] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      try {
        // eslint-disable-next-line prettier/prettier
        const { data } = await getaAllUsers(user._id)
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
      if (currentConversation === null) {
        createConversation({
          senderId: currentUserId,
          receverId: user._id,
        })
          .then((resultat) => {
            setCurrentConversation(resultat.data.result)
          })
          .catch((error) => console.log(error))
      }
    } catch (error) {
      // error
    }
  }

  const checkMemberOnline = (member) => {
    const online = onlineUsers.find((user) => user.userId === member._id)
    if (online === undefined) {
      return false
      // eslint-disable-next-line no-else-return
    } else {
      return true
    }
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {getdata
        // eslint-disable-next-line arrow-body-style
        && allUsersData.map((user) => {
           const isOnline = checkMemberOnline(user)
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
                  {isOnline && <div className="online-dot"> </div>}
                  <img
                    src={
                      user?.profilepicture === null ? user?.profilepicture : profileuser
                    }
                    alt="Profile"
                    className="followerImage"
                    // eslint-disable-next-line prettier/prettier
                    style={{ width: '70px', height: '70px' }}
                  />
                  <div className="name" style={{ fontSize: '1rem' }}>
                    <span>{user?.username}</span>
                    <ContactMessage current={user} />
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
