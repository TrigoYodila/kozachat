import Login from "./components/Login/Login";
import Protected from "./components/Protected/Protected";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Conversation from "./components/conversation/Conversation";
import { useEffect, useState } from "react";
import { useStateValue } from "./reducers/StateProvider";
import axios from "axios";

function App() {
  // const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();
  const [userId, setUserId] = useState(null);

  

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((user) => {
          setUserId(user.data.user.id);
          console.log("app data new", user.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, []);

  useEffect(()=>{
       
    axios
          .get(`http://localhost:5000/auth/authuser/${userId}`)
          .then((user) => {
            dispatch({
              type: "GET_USER",
              user: user.data.user,
            });
            console.log("app data user", user);
          })
          .catch((err) => {
            console.log(err);
          });
      
  },[userId])

  console.log("app user reducer ", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/chat" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
