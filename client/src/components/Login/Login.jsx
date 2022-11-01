import React, { useState, useEffect } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Register from './Register'
import { useStateValue } from '../../reducers/StateProvider'

const Login = () => {
  // eslint-disable-next-line object-curly-spacing, no-unused-vars
  const [{ user }, dispatch] = useStateValue()

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [clicked, setClicked] = useState(false)

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
          navigate('/protected')
        })
        .catch(() => {
          navigate('/login')
        })
    }
  }, [])

  // console.log('user', user)
  const submit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:5000/auth/login', { username, password })
      .then((myuser) => {
        localStorage.setItem('token', myuser.data.token)
        dispatch({
          type: 'GET_USER',
          user: myuser.data.user,
        })
        navigate('/protected')
      })
      .catch(() => {
        // error
      })
  }

  const handleClicked = () => {
    setClicked(true)
  }

  const display = clicked ? (
    <Register />
  ) : (
    <div className="container">
      <form action="">
        <div className="inputs">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button onClick={submit} type="submit" className="btn-connect">
            SE CONNECTER
          </button>
          <div>
            <p>
              Vous n&apos avez pas de compte ?
              <span onClick={handleClicked} aria-hidden="true">
                créer un compte
              </span>
            </p>
          </div>
        </div>
      </form>
      <div className="form-blour"> </div>
    </div>
  )

  return display
}

export default Login
