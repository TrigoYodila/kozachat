import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Register from "./Register";
import { useStateValue } from "../../reducers/StateProvider";

const Login = () => {
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);

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

  console.log("valeur ", user);

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/auth/login", { username, password })
      .then((user) => {
        localStorage.setItem("token", user.data.token);
        dispatch({
          type: "GET_USER",
          user: user.data.user,
        });
        navigate("/protected");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClicked = () => {
    setClicked(true);
  };

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
          <button onClick={submit} className="btn-connect">
            SE CONNECTER
          </button>
          <div>
            <p>
              {" "}
              Vous n'avez pas de compte ?{" "}
              <span onClick={handleClicked}>créer un compte</span>
            </p>
          </div>
        </div>
      </form>
      <div className="form-blour"></div>
    </div>
  );

  return display;
};

export default Login;
