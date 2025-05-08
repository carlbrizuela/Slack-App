import React, { useState } from "react";
import { render, screen } from '@testing-library/react';
import App from "./App"
import { jest } from "@testing-library/jest-dom"
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
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
