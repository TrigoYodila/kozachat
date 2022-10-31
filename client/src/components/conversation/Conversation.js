/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { BsCamera } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import Picker from 'emoji-picker-react'
import './conversation.css'
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
  // const [inputStr, setInputStr] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const scroll = useRef()
  const inputRef = useRef()
  const fileRef = useRef()

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

  // emoji function
  const onEmojiClick = (event) => {
    setNewMessage((prevInput) => prevInput + event.emoji)
    setShowPicker(false)
    inputRef.current.focus()
  }
  // scroll always to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleFile = () => {
    fileRef.current.click()
  }
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
          <div className="search-container">
            <div className="search-content">
              <input
                type="text"
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message ici"
                className="search-input"
                multiple="true"
                aria-hidden="true"
              />
              <div className="search-icons">
                <span className="emoji">
                  <MdOutlineEmojiEmotions
                    onClick={() => setShowPicker((val) => !val)}
                  />
                </span>
                <span className="camera">
                  <input
                    type="file"
                    ref={fileRef}
                    accept=".jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                  />
                  <BsCamera onClick={handleFile} />
                </span>
              </div>
              <div className="emoji-container">
                {showPicker && (
                  <Picker
                    pickerStyle={{ width: '100%' }}
                    onEmojiClick={onEmojiClick}
                  />
                )}
              </div>
            </div>
            <div className="button" onClick={handleSend} aria-hidden="true">
              <BiSend className="send-icon" />
            </div>
          </div>
        </>
      ) : (
        <span className="message-empty">Demarrer une conversation</span>
      )}
    </div>
  )
}

export default Conversation
