import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DataProvider from "./context/DataProvider";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Message from "./components/Messages/Message";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import Register from "./components/Register"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/message"
            element={
              isAuthenticated ? (
                <Message onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* You can add other routes like /message, /channel/:id here */}
        </Routes>
      </Router>
      <div>Email</div>
    </DataProvider>
  );
}

export default App;
