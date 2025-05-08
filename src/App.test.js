import React, { useState } from "react";
import { render, screen } from '@testing-library/react';
import App from "./App"
import { jest } from "@testing-library/jest-dom"
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import Login from "./components/Login";
import '@testing-library/jest-dom'

test('full app rendering/navigating', async () => {
  render(<App />, {wrapper: BrowserRouter})

  // verify page content for default route
  expect(screen.getByText("Login").toBeInTheDocument())

})

// test('renders Login Page', () => {
//   Login.mockImplementation(() => <h1>Login</h1>);

//   render(
//     <MemoryRouter initialEntries={['/login']}>
//       <App />
//     </MemoryRouter>
//   );
//   const linkElement = screen.getByText("Login");
//   expect(linkElement).toBeInTheDocument();
// });
