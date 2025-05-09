import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";

test("renders login screen by default when not authenticated", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const loginText = screen.getByText(/login/i);
  expect(loginText).toBeInTheDocument();
});
