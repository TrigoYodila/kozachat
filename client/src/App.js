/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Login from './components/Login/Login'
import Protected from './components/Protected/Protected'
// eslint-disable-next-line import/order
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Conversation from './components/conversation/Conversation'
// eslint-disable-next-line prettier/prettier
import { useStateValue } from './reducers/StateProvider'
// eslint-disable-next-line import/order
import axios from 'axios'
import Started from './components/Login/Started'
import Register from './components/Login/Register'

function App() {
  const [dispatch] = useStateValue()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
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
        .catch(() => {
          // error
        })
    }
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/authuser/${userId}`)
      // eslint-disable-next-line no-shadow
      .then((user) => {
        dispatch({
          type: 'GET_USER',
          user: user.data.user,
        })
      })
      .catch(() => {
        // error
      })
  }, [userId])

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
