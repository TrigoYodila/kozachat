/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react'
import './conversation.css'
import InputEmoji from 'react-input-emoji'
import { getaUser } from '../../api/UserRequest'
import profileuser from '../../Assets/images/user.png'
import { getMessages, addMessage } from '../../api/MessagesRequest'
// import {format} from 'timeago.js';

function Conversation({
  conversation,
  currentUserId,
  setSendMessage,
  receiveMessage,
  messages,
  setMessages,
}) {
  const [userData, setUserData] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const scroll = useRef()

  useEffect(() => {
    if (
      // eslint-disable-next-line prettier/prettier
      receiveMessage !== null && receiveMessage.conversationId === conversation._id
      // eslint-disable-next-line prettier/prettier
    ) setMessages((prev) => [...prev, receiveMessage])
  }, [receiveMessage])

  // get Data for header
  useEffect(() => {
    const userId = conversation?.participants?.find(
      (id) => id !== currentUserId
    )
    const getUserData = async () => {
      try {
        const { data } = await getaUser(userId)
        setUserData(data)
        // console.log("donnée protegé", data);
      } catch (error) {
        // error
      }
    }

    if (conversation !== null) getUserData()
  }, [conversation, currentUserId])

  // Fecth data for messages

  useEffect(() => {
    const takeMessages = async () => {
      try {
        const { data } = await getMessages(conversation._id)
        setMessages(data)
      } catch (error) {
        // error
      }
    }

    if (conversation !== null) takeMessages()
  }, [conversation])

  // eslint-disable-next-line no-shadow
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const handleSend = async (e) => {
    e.preventDefault()

    const message = {
      senderId: currentUserId,
      content: newMessage,
      conversationId: conversation._id,
    }

    // send message to database

    try {
      const { data } = await addMessage(message)
      setMessages((prev) => [...prev, data])
      setNewMessage('')
    } catch (error) {
      // error
    }

    // send message to socket server
    const receverId = conversation.participants.find(
      (id) => id !== currentUserId
    )
    setSendMessage({ ...message, receverId })
  }

  // scroll always to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="conversation-container">
      {conversation ? (
        <>
          <div className="conversation-header">
            <div className="follower">
              <div>
                <img
                  src={profileuser}
                  alt=""
                  style={{ width: '50px', height: '50px' }}
                />
                <div className="name">
                  <span>{userData?.username}</span>
                  <span>online</span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: '95%',
                border: '1px solid rgb(207, 207, 207)',
                marginTop: '10px',
              }}
            />
          </div>

          <div className="conversation-body">
            {messages.map((message) => (
              <div
                ref={scroll}
                className={
                  message.senderId === currentUserId ? 'message' : 'own'
                }
              >
                <span className="text">{message.content}</span>
                <small className="date date-own">{message.createdAt}</small>
              </div>
            ))}
          </div>

          <div className="conversation-sender">
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div
              className="send-button button"
              onClick={handleSend}
              aria-hidden="true"
            >
              envoyer
            </div>
            <input type="file" name="" id="" />
          </div>
        </>
      ) : (
        <span className="message-empty">Demarrer une conversation</span>
      )}
    </div>
  )
}

export default Conversation
