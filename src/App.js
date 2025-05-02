import './App.css';
import DataProvider from './context/DataProvider';
import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from './components/Login';
import Message from './components/Messages/Message';
import Dashboard from './components/Dashboard';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element = { <Login onLogin={handleLogin} /> } />
          <Route path="/dashboard" element = { isAuthenticated ? ( <Dashboard onLogout={handleLogout} /> ) : (<Navigate to="/login" />)} />
          <Route path="/message" element = { isAuthenticated ? ( <Message onLogout={handleLogout} /> ) : (<Navigate to="/login" />)} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
