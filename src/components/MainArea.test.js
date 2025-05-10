import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainArea from "./MainArea";
import { BrowserRouter } from "react-router";

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../context/DataProvider", () => ({
  useData: () => ({
    getUsers: jest.fn(),
    fetchChannels: jest.fn(),
    userList: [],
    channels: [],
    userHeaders: {},
  }),
}));

test('Clicking "+ New Channel" navigates to /channel/create', () => {
  render(
    <BrowserRouter>
      <MainArea onLogout={() => {}} />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("+ New Channel"));
  expect(mockNavigate).toHaveBeenCalledWith("/channel/create");
});
