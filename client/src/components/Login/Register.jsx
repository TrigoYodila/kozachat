import React from "react";
import { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Register = () => {
//   const navigate = useNavigate();
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
//      const [authentification, setAuthentification] = useState({
//         username:"",
//         lastname:"",
//         password:"",
//         confirmpassword : "",
//         profile:""
//      })

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/auth/protected", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         navigate("/protected");
//       })
//       .catch((err) => {
//         console.log(err);
//         navigate("/login");
//       });
//   }, []);

//   const submit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/auth/login", { username, password })
//       .then((user) => {
//         console.log(user);
//         localStorage.setItem("token", user.data.token);
//         navigate("/protected");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  return (
    <div className="container">
      <form action="">
        
        <div className="inputs">
          <input
            type="text"
            placeholder="username"
           
            
          />
          <input
            type="text"
            placeholder="lastname"
           
          />
          <input
            type="password"
            placeholder="password"
           
          />
          <input
            type="password"
            placeholder="confirm password"
           
          />
        </div>

        <div className="buttons">
          <button className="btn-connect">
            Créer un compte
          </button>
          <div>
            <p>
              {" "}
              Vous avez déjà un compte ? <span>se connecter</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
