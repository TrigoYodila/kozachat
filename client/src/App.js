/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Login from './components/Login/Login'
import Protected from './components/Protected/Protected'
// eslint-disable-next-line import/order
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Conversation from './components/conversation/Conversation'
import { useStateValue } from './reducers/StateProvider'
// eslint-disable-next-line import/order
import axios from 'axios'
import Started from './components/Login/Started'
import Register from './components/Login/Register'
// import Loading from './components/Login/Loading'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue()
  const [userId, setUserId] = useState(null)
  const token = localStorage.getItem('token')
  // const [isloading, setIsLoading] = useState(false)
  // console.log('USER APP', user)
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/auth/user', {
          headers: {
            Authorization: token,
          },
        })
        // eslint-disable-next-line no-shadow
        .then((user) => {
          setUserId(user.data.user.id)
        })
        .catch((error) => {
          console.log('error ', error)
        })
    }
  }, [user])

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/auth/authuser/${userId}`, {
          headers: {
            Authorization: token,
          },
        })
        // eslint-disable-next-line no-shadow
        .then((user) => {
          dispatch({
            type: 'GET_USER',
            user: user.data.user,
          })
        })
        .catch((error) => {
          console.log('error login ', error)
        })
    }
  }, [userId, token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Started />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/chat" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
