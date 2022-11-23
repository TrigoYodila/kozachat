import React, { useState, useEffect } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../../reducers/StateProvider'

const Login = () => {
  // eslint-disable-next-line object-curly-spacing, no-unused-vars
  const [{ user }, dispatch] = useStateValue()

  const navigate = useNavigate()
  const [dataUser, setDataUser] = useState({
    username: '',
    password: '',
  })
  const [formError, setFormError] = useState()
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

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
  // const submit = (e) => {
  //   e.preventDefault()

  //   axios
  //     .post('http://localhost:5000/auth/login', {
  //       username: dataUser.username,
  //       password: dataUser.password,
  //     })
  //     .then((myuser) => {
  //       localStorage.setItem('token', myuser.data.token)
  //       dispatch({
  //         type: 'GET_USER',
  //         user: myuser.data.user,
  //       })
  //       navigate('/protected')
  //     })
  //     .catch(() => {
  //       // error
  //     })
  // }

  const validateInput = (event) => {
    event.preventDefault()
    const inputError = {
      error: '',
    }
    if (!dataUser.username || !dataUser.password) {
      setFormError({
        error: 'veuillez remplir les deux champs',
      })
      return
    }
    if (dataUser.username && dataUser.password.length < 3) {
      setFormError({
        error: 'Trois caractères au moins pour le mot de passe',
      })
      // eslint-disable-next-line no-useless-return
      return
    }
    setFormError(inputError)

    axios
      .post('http://localhost:5000/auth/login', {
        username: dataUser.username,
        password: dataUser.password,
      })
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
    navigate('/register')
  }

  const handleUser = (e) => {
    const { name, value } = e.target
    setDataUser((prev) => ({ ...prev, [name]: value }))
    setFormError('')
  }
  const result = formError?.error && (
    <div className="error">
      <span>{formError?.error ? formError.error : null}</span>
    </div>
  )
  return (
    <div className="container">
      <form onSubmit={validateInput}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={dataUser.username}
            onChange={(e) => handleUser(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={dataUser.password}
            onChange={(e) => handleUser(e)}
          />
        </div>
        {result}
        <div className="buttons">
          <button type="submit" className="btn-connect">
            SE CONNECTER
          </button>
          <div>
            <p>
              Vous n avez pas de compte ?
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
}

export default Login
