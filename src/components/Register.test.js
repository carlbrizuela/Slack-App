import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter } from "react-router";

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

test("Clicking Login navigates to /login", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  const loginLink = screen.getByText("Login");
  fireEvent.click(loginLink);

  expect(mockNavigate).toHaveBeenCalledWith("/login");
});