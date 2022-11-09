import React from 'react'
import './loading.scss'

// eslint-disable-next-line arrow-body-style
const Loading = () => {
  return (
    <div className="body">
      <div className="loader">
        <div className="square"> </div>
        <div className="square"> </div>
        <div className="square last"> </div>
        <div className="square clear"> </div>
        <div className="square"> </div>
        <div className="square last"> </div>
        <div className="square clear"> </div>
        <div className="square "> </div>
        <div className="square last"> </div>
      </div>
    </div>
  )
}

export default Loading
