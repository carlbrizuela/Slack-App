import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

test("Home button click triggers navigate to /dashboard", () => {
  render(
    <BrowserRouter>
      <Sidebar onLogout={() => {}} />
    </BrowserRouter>
  );

  const homeButton = screen.getByText("Home");
  fireEvent.click(homeButton);

  expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
});
