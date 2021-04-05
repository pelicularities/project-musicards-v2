// REACT AND FRIENDS
import React from "react";
import { fireEvent, render } from "@testing-library/react";

// INTERNAL IMPORTS
import App from "../App";

describe("Login component", () => {
  test("Login component renders properly", () => {
    const { getByText, getByLabelText } = render(<App />);
    const loginButton = getByText("Login");
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    const usernameField = getByLabelText("Username");
    const passwordField = getByLabelText("Password");
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test("Invalid login produces error message", () => {
    const { getByText } = render(<App />);
    const loginButton = getByText("Login");
    fireEvent.click(loginButton);
    const submitLoginButton = getByText("Log In");
    fireEvent.click(submitLoginButton);
    const errorMessage = getByText("Invalid login credentials.");
    expect(errorMessage).toBeInTheDocument();
  });
});
