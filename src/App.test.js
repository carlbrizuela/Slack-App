import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import {App, LocationDisplay} from './app'
import {Router, MemoryRouter} from 'react-router-dom'

jest.mock("react-router-dom")

test("Check email field", () => {
  render( <MemoryRouter initialEntries={'/'}>
    <App />
  </MemoryRouter>)
  const linkElement = screen.getByText("Email");
  expect(linkElement).toBeInTheDocument();
});
