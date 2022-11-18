/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton'
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
  // eslint-disable-next-line prettier/prettier
  currentConversation
}) {
  const [{ user }] = useStateValue()
  const { currentUserId } = useContext(userContext)
  const [allUsersData, setAllUsersData] = useState(null)
  // const [participantId, setParticipantIdId] = useState(null)
  const [getdata, setGetData] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [loading, SetIsLoading] = useState(true)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getaAllUsers(user._id)
        setAllUsersData(data)
        setTimeout(() => SetIsLoading(false), 1000)
        setGetData(true)
      } catch (error) {
        // error
      }
    }
    getUserData()
  }, [])
  // console.log('Je suis Loading contact', loading)
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
        // eslint-disable-next-line arrow-body-style, prettier/prettier
          && allUsersData.map((user, index) => {
          // eslint-disable-next-line prettier/prettier
           const isOnline = checkMemberOnline(user)
          return (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => {
                UserInConversation(user)
              }}
            >
              <div className="follower conversation">
                <div className="conversation-user">
                  {isOnline && <div className="online-dot"> </div>}
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={70}
                      height={55}
                    />
                  ) : (
                    <img
                      src={
                        user?.profilepicture !== null
                          ? user?.profilepicture
                          : profileuser
                      }
                      alt="Profile"
                      className="followerImage"
                      style={{ width: '70px', height: '70px' }}
                    />
                  )}
                  <div className="name" style={{ fontSize: '1rem' }}>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="40%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                      <span>{user?.username}</span>
                    )}
                    <ContactMessage
                      current={user}
                      // loading={loading}
                      // SetIsLoading={SetIsLoading}
                    />
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
