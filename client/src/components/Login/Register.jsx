import React from "react";
import { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
// import { addUser } from "../../../../serveur/Controllers/UserControllers";
import { useStateValue } from "../../reducers/StateProvider";

const Register = () => {

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
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

  // const submit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5000/auth/login", { username, password })
  //     .then((user) => {
  //       console.log(user);
  //       localStorage.setItem("token", user.data.token);
  //       navigate("/protected");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isvalid, setIsvalid] = useState(null);

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  //validate client

  const validateFormInput = (event) => {
    event.preventDefault();

    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formInput.email && !formInput.password) {
      setFormError({
        ...inputError,
        email: "Entrer une adresse email valide",
        password: "Le mot de passe ne doit pas être vide",
      });
      return;
    }

    if (!formInput.email || !formInput.email.includes("@gmail.com")) {
      setFormError({
        ...inputError,
        email: "Enter une adresse email valide",
      });
      return;
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Les deux mot de passe doivent correspondre",
      });
      return;
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Le mot de passe ne doit pas être vide",
      });
      return;
    }

    setFormError(inputError);

    //created user
    axios
      .post("http://localhost:5000/auth/register", {
        username: formInput.email,
        password: formInput.password,
      })
      .then((user) => {
        console.log(user);
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

  return (
    <div className="container">
      <form onSubmit={validateFormInput}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formInput.email}
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
          />
          <small className="error-message">{formError.email}</small>

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
          />
          <small className="error-message">{formError.password}</small>

          <input
            type="password"
            placeholder="Confirm password"
            value={formInput.confirmPassword}
            name="confirmPassword"
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
          />
          <small className="error-message">{formError.confirmPassword}</small>
        </div>

        <div className="buttons">
          <input
            className="btn-connect"
            type="submit"
            value="CREER UN COMPTE"
          />

          <div>
            <p>
              {" "}
              Vous avez déjà un compte ? <span>se connecter</span>
            </p>
          </div>
        </div>
      </form>
      <div className="form-blour"></div>
    </div>
  );
};

export default Register;
