/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable dot-notation */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../../reducers/StateProvider'
import profileuser from '../../Assets/images/user.png'

function Register({ setClicked }) {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue()
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [dataUser, setDataUser] = useState({
    username: '',
    password: '',
    profilepicture: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataUser((preventState) => ({ ...preventState, [name]: value }))
  }
  // console.log('image log', image)
  console.log('NEW USER REGISTER', user)

  // FormData
  // console.log('Data Result', resutData)
  // get secure
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [formError, setFormError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    })
  }

  // validate client

  const validateFormInput = async (event) => {
    event.preventDefault()

    const inputError = {
      email: '',
      password: '',
      confirmPassword: '',
    }

    if (!dataUser.username && !dataUser.password) {
      setFormError({
        ...inputError,
        email: 'Entrer une adresse email valide',
        password: 'Le mot de passe ne doit pas être vide',
      })
      return
    }

    if (!dataUser.username) {
      setFormError({
        ...inputError,
        email: 'Enter une adresse email valide',
      })
      return
    }

    if (formInput.confirmPassword !== dataUser.password) {
      setFormError({
        ...inputError,
        confirmPassword: 'Les deux mot de passe doivent correspondre',
      })
      return
    }

    if (!dataUser.password) {
      setFormError({
        ...inputError,
        password: 'Le mot de passe ne doit pas être vide',
      })
      return
    }

    setFormError(inputError)

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'trigoyodila')
    // console.log('Form Data', formData)
    const resultData = await axios({
      method: 'post',
      url: 'https://api.cloudinary.com/v1_1/dqsxdo3wo/upload',
      data: formData,
    })
    const profilepicture = resultData.data['secure_url']
    console.log('res image', resultData)
    if (profilepicture !== null) {
      // created user
      axios
        .post('http://localhost:5000/auth/register', {
          username: dataUser.username,
          password: dataUser.password,
          profilepicture,
        })
        // eslint-disable-next-line no-shadow
        .then((user) => {
          console.log('USER REGIS ', user.data.user)
          localStorage.setItem('token', user.data.token)
          dispatch({
            type: 'GET_USER',
            user: user.data.user,
          })
        })
        .catch((err) => console.log(err))
    }
    navigate('/protected')
  }

  // const handleImageChange = (imgselected) => {
  //   setImage(imgselected[0])
  // }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleGoLogin = () => {
    setClicked(false)
  }
  return (
    <div className="container">
      <form onSubmit={validateFormInput}>
        <div className="register-infos">
          <div className="inputs">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={dataUser.username}
              onChange={(e) => handleChange(e)}
            />
            <small className="error-message">{formError.email}</small>

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={dataUser.password}
              onChange={(e) => handleChange(e)}
            />
            <small className="error-message">{formError.password}</small>

            <input
              type="password"
              placeholder="Confirm password"
              value={formInput.confirmPassword}
              name="confirmPassword"
              onChange={({ target }) => {
                handleUserInput(target.name, target.value)
              }}
            />
            <small className="error-message">{formError.confirmPassword}</small>
          </div>
          <div className="register-profil">
            <div className="image-profil">
              <img src={image || profileuser} alt="" />
            </div>
            <label
              htmlFor="formId"
              onChange={handleImageChange}
              className="file-button"
            >
              <input
                type="file"
                id="formId"
                accept="image/png, jpg, jpeg"
                name="avatar"
                style={{ display: 'none' }}
              />
              +
            </label>
          </div>
          <div className="buttons">
            <input
              className="btn-connect"
              type="submit"
              value="CREER UN COMPTE"
            />

            <div>
              <p>
                Vous avez déjà un compte ?
                <span onClick={handleGoLogin}> se connecter</span>
              </p>
            </div>
          </div>
        </div>
      </form>
      <div className="form-blour"> </div>
    </div>
  )
}

export default Register
