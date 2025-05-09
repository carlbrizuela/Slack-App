import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";

jest.mock('axios')

describe("Register Button Component", () => {
   render(<Register />)
   const counterButton = screen.getByText("Register")

   test("Button Rendering", () => {
      expect(counterButton).toBeInTheDocument();
   })

   test("Disabled button", () => {
      expect(counterButton).toBeDisabled()
   });

})