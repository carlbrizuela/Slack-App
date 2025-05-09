import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router";
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
    <div className="w-100 d-flex flex-column mx-auto align-items-center">
      <div className="input-form">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-floating mb-3 w-100">
            <input
              id="floatingEmail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="name@example.com"
            />
            <label for="floatingEmail">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              id="floatingPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="password"
            />
            <label for="floatingPassword">Password:</label>
          </div>

          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
      </div>
      <div className="mt-3">
        <p className="mt-0">
          Don't have an account?
          <span id="register-button" onClick={handleRegister} className="fw-bold"> Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;