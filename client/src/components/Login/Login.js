import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="container">
      <form action="">
        <div className="username">
          <label htmlFor="username">username</label>
          <input type="text" />
        </div>
        <div className="password">
          <label htmlFor="password">password</label>
          <input type="password" />
        </div>
        <button>Se connecter</button>
        <button>Créer un compte</button>
      </form>
    </div>
  );
};

export default Login;
