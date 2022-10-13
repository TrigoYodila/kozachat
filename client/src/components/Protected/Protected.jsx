import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = () => {

    const navigate = useNavigate()

    useEffect(()=>{
       const token = localStorage.getItem('token')
       axios.get("http://localhost:5000/auth/protected", {headers:{
        Authorization:token,
       }}).then(res=>{
        console.log(res)
       }).catch(err=>{
        console.log(err)
        navigate('/login')
       });
    },[])

  return (
    <div>
      <h1>Protected</h1>
    </div>
  )
}

export default Protected
