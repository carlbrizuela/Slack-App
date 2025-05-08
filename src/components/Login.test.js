import React, { useState } from "react";
import { render, screen } from '@testing-library/react';
import Login from "./Login";

jest.mock('axios')

test('renders learn react link', () => {
   axios.get.mockResolvedValue(resp)
  render(<Login />);
  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
});