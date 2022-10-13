import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/auth/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
         navigate("/protected");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(username,password)
    axios.post("http://localhost:5000/auth/login", {username,password})
    .then(user=>{
      console.log(user)
      localStorage.setItem('token',user.data.token)
      navigate('/protected')
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className="container">
      <form action="">
        <div className="username">
          <label htmlFor="username">username</label>
          <input type="text" placeholder="your name" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="password">
          <label htmlFor="password">password</label>
          <input type="password" placeholder="your password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button onClick={submit}>Se connecter</button>
        <button>Créer un compte</button>
      </form>
    </div>
  );
};

export default Login;
