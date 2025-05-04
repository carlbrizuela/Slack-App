import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataProvider";

function Login(props) {
  const { onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleHeaders } = useData("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginCredentials = {
        email,
        password
      };

      const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
      const { data, headers } = response;
      if (data && headers) {
        const accessToken = headers["access-token"];
        const expiry = headers["expiry"];
        const client = headers["client"];
        const uid = headers["uid"];

        console.log(data);
        console.log(accessToken, expiry, client, uid);

        handleHeaders(headers);

        onLogin();
        navigate('/dashboard');
      }
    } catch (error) {
      if (error) {
        return alert("Invalid credentials");
      }
    }
  };

  const handleRegister = () => {
    navigate('/register')
  } 

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Login;