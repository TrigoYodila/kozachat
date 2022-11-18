/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './sidebar.css'
// eslint-disable-next-line import/order
import { BsChatDotsFill, BsPersonCircle } from 'react-icons/bs'
import profileuser from '../../Assets/images/user.png'
// eslint-disable-next-line import/order
import { useStateValue } from '../../reducers/StateProvider'
// eslint-disable-next-line import/no-duplicates, import/order
import { RiLogoutBoxFill } from 'react-icons/ri'

// eslint-disable-next-line react/prop-types
function Sidebar({ clickedLink, setClickedLink }) {
  const [{ user }] = useStateValue()
  // const [{ user }] = useStateValue()
  const navigate = useNavigate()
  console.log('clicked user ', user)

  const handleClicked = () => {
    setClickedLink(false)
  }

  const handleClickedContact = () => {
    setClickedLink(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    // dispatch({
    //   type: 'GET_USER',
    //   user: {},
    // })
    // eslint-disable-next-line no-underscore-dangle
    navigate('/login')
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <div className="user-image">
          <img
            src={
              user?.profilepicture !== null ? user?.profilepicture : profileuser
            }
            alt=""
          />
          {/* <p>{user?.username}</p> */}
        </div>
        <div className="user-icons-container">
          <div
            className={
              clickedLink === false ? 'user-icons active' : 'user-icons'
            }
            onClick={handleClicked}
            aria-hidden="true"
          >
            <div className="right-bar"> </div>
            <span className="message-icon">
              <BsChatDotsFill />
            </span>
          </div>
          <div
            className={
              clickedLink === true ? 'user-icons active' : 'user-icons'
            }
            onClick={handleClickedContact}
          >
            <div className="right-bar"> </div>
            <span className="message-icon">
              <BsPersonCircle />
            </span>
          </div>
        </div>
      </div>
      <div className="sidebar-logout">
        <span>
          <RiLogoutBoxFill onClick={logout} cursor />
        </span>
      </div>
    </div>
  )
}

export default Sidebar
