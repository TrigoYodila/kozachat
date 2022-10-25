/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Conversation from '../conversation/Conversation'
import Sidebar from '../Sidebar/Sidebar'
import User from '../Users/User'
import './protected.css'
import { useStateValue } from '../../reducers/StateProvider'
import { userConversation } from '../../api/ConversationRequest'
import userContext from './userContext'
// eslint-disable-next-line import/order
import { io } from 'socket.io-client'
// eslint-disable-next-line import/order
import { FiSearch } from 'react-icons/fi'
// eslint-disable-next-line import/order
import { BsThreeDotsVertical } from 'react-icons/bs'
import Contact from '../Contact/Contact'

function Protected() {
  const navigate = useNavigate()
  const socket = useRef()

  const [{ user }] = useStateValue()

  const [conversation, setConversation] = useState([])
  const [currentUserId, setCurrentUserId] = useState('')
  const [currentConversation, setCurrentConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [clickedLink, setClickedLink] = useState(false)

  // console.log("mes conversations", conversation);
  // console.log("CURRENT CONVESATION", currentConversation)

  // s end message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])
  // receive Message from socket server
  //  useEffect(() => {
  //    socket.current.on("receive-message", (data)=>{
  //     setReceiveMessage(data)
  //    })
  //  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const { data } = await userConversation(user._id)
        setConversation(data)
      } catch (error) {
        // error
      }
    }
    getConversations()
    // eslint-disable-next-line no-underscore-dangle
    setCurrentUserId(user._id)
    // axios.get(`http://localhost:5000/conversation/${user._id}`)
    // .then(data=>console.log("mes data ", data));
    // eslint-disable-next-line no-underscore-dangle
  }, [user._id])

  // // Connect to Socket.io
  useEffect(() => {
    socket.current = io('ws://localhost:8800')
    // eslint-disable-next-line no-underscore-dangle
    socket.current.emit('new-user-add', user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:5000/auth/protected', {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        // error
      })
      .catch(() => {
        // error
        navigate('/login')
      })

    // receive Message from socket server
    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data)
    })
  }, [])

  // eslint-disable-next-line no-shadow
  const checkOnlineStatus = (conversation) => {
    // console.log("Online executé", conversation.participants)
    const chatMember = conversation.participants.find(
      // eslint-disable-next-line no-underscore-dangle
      (member) => member !== user._id
    );
    // console.log("Chat Member", onlineUsers);
    // eslint-disable-next-line no-shadow
    const online = onlineUsers.find((user) => user.userId === chatMember);
    // return online ? false : true;
    if (online === undefined) {
      return false
    // eslint-disable-next-line no-else-return
    } else {
      return true
    }
  }

  // console.log("user current Id", currentUserId)
  return (
    <div className="chat-container">
      <userContext.Provider value={{ user, conversation, currentUserId }}>
        <Sidebar
          user={user}
          clickedLink={clickedLink}
          setClickedLink={setClickedLink}
        />

        <div className="user-container">
          <div className="user-search">
            <span>
              <FiSearch size={18} />
            </span>
            <input type="text" placeholder="Search" />
            <span>
              <BsThreeDotsVertical size={15} color="#1966ff" />
            </span>
          </div>

          <div className="recent-user-info">
            <h1>{clickedLink === false ? 'Recent' : 'Contacts'}</h1>
            {clickedLink === false ? (
              // eslint-disable-next-line no-shadow
              conversation.map((conversation) => {
                const isOnline = checkOnlineStatus(conversation);
                return (
                  // eslint-disable-next-line max-len
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    onClick={() => {
                      setCurrentConversation(conversation);
                    }}
                  >
                    <User data={conversation} online={isOnline} />
                  </div>
                );
              })
            ) : (
              <Contact
                // conversation = {conversation}
                setCurrentConversation={setCurrentConversation}
                checkOnlineStatus={checkOnlineStatus}
                currentConversation={currentConversation}
              />
            )}
          </div>
        </div>

        <Conversation
          conversation={currentConversation}
          currentUserId={currentUserId}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
          messages={messages}
          setMessages={setMessages}
        />
      </userContext.Provider>
    </div>
  );
}

export default Protected
