import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import DataProvider from "./context/DataProvider";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Message from "./components/Messages/Message";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/Register";
import Channel from "./components/Channel";
import ChannelCreate from "./components/ChannelCreate";
import ChannelAddMember from "./components/ChannelAddMember";
import { useParams } from "react-router";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  function ChannelAddMemberWrapper() {
    const { id } = useParams();
    return <ChannelAddMember channelId={Number(id)} />;
  }

  return (
    <div className="d-flex align-items-center h-100">
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
            <Route
              path="/channel"
              element={
                isAuthenticated ? (
                  <Channel onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/channel/create"
              element={
                isAuthenticated ? <ChannelCreate /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/channel/add-member"
              element={
                isAuthenticated ? (
                  <ChannelAddMember />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/channel/:id"
              element={isAuthenticated ? <Channel /> : <Navigate to="/login" />}
            />
            <Route
              path="/channel/:id/add-member"
              element={
                isAuthenticated ? (
                  <ChannelAddMemberWrapper />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* You can add other routes here */}
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
