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
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/Register";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("Email");
  expect(linkElement).toBeInTheDocument();
});
