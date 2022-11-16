/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios'
// eslint-disable-next-line object-curly-newline
import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
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
import Loading from '../Login/Loading'

function Protected() {
  // const navigate = useNavigate()
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
  const [isloading, setIsLoading] = useState(true)
  // console.log("CURRENT CONVESATION", currentConversation)

  // send message to socket server
  // console.log('USERS CONVERSATION', currentConversation)
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
  // console.log('user protected', user)
  useEffect(() => {
    const getConversations = async () => {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const { data } = await userConversation(user?._id)
        setConversation(data)
      } catch (error) {
        // error
      }
    }
    getConversations()
    // eslint-disable-next-line no-underscore-dangle
    setCurrentUserId(user?._id)
    // eslint-disable-next-line no-underscore-dangle
  }, [user?._id])

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
    if (token) {
      axios
        .get('http://localhost:5000/auth/protected', {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          // setIsLoading(false)
        })
        .catch(() => {
          // error
          // setTimeout(() => navigate('/login'), 2500)
        })
    }

    // receive Message from socket server
    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data)
    })

    // Loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  // eslint-disable-next-line no-shadow
  const checkOnlineStatus = (conversation) => {
    const chatMember = conversation.participants.find(
      // eslint-disable-next-line no-underscore-dangle
      (member) => member !== user._id
    );
    // eslint-disable-next-line no-shadow
    const online = onlineUsers.find((user) => user.userId === chatMember);
    if (online === undefined) {
      return false
    // eslint-disable-next-line no-else-return
    } else {
      return true
    }
  }
  return isloading ? (
    <Loading />
  ) : (
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
              conversation.map((conversation, index) => {
                const isOnline = checkOnlineStatus(conversation)
                return (
                  // eslint-disable-next-line max-len
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onClick={() => {
                      setCurrentConversation(conversation)
                    }}
                  >
                    <User
                      data={conversation}
                      online={isOnline}
                      messages={messages}
                    />
                  </div>
                )
              })
            ) : (
              <Contact
                // conversation = {conversation}
                onlineUsers={onlineUsers}
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
  )
}

export default Protected
