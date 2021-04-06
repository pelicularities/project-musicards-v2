/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// The above line is needed to avoid re-declaration of fetchMock,
// which is already declared in setupTests.js

// Note: Need a break from this one, will get back to it later
// Two separate issues:
// 1. Mock fetch without breaking the test
// 2. Test the custom hook

// REACT AND FRIENDS
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

// EXTERNAL IMPORTS

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";
import { useCurrentUserHook } from "../contexts/useCurrentUserHook";
import Login from "../components/Login";
import LandingPage from "../components/LandingPage";

xdescribe("Login component", () => {
  const { user, setUser } = renderHook(() => useCurrentUserHook());
  const LoginContext = (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Login />
        <Route exact path="/" render={() => <LandingPage />} />
      </BrowserRouter>
    </UserContext.Provider>
  );

  beforeEach(() => {
    const mockUser = {
      id: "000000000000000000000000",
      name: "mocktest",
    };
    fetchMock.mockOnce(JSON.stringify(mockUser));
  });
  test("Login component renders properly", async () => {
    await waitFor(() => {
      const { getByLabelText } = render(LoginContext);
      const usernameField = getByLabelText("Username");
      const passwordField = getByLabelText("Password");
      expect(usernameField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
    });
  });

  test("Invalid login produces error message", () => {
    const { getByText } = render(LoginContext);
    const submitLoginButton = getByText("Log In");
    fireEvent.click(submitLoginButton);
    const errorMessage = getByText("Invalid login credentials.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Valid login returns user to main page", () => {
    const { getByText, getByLabelText } = render(LoginContext);
    const usernameField = getByLabelText("Username");
    const passwordField = getByLabelText("Password");
    fireEvent.change(usernameField, { target: { value: "username" } });
    fireEvent.change(passwordField, { target: { value: "password" } });
    const submitLoginButton = getByText("Log In");
    fireEvent.click(submitLoginButton);
    const errorMessage = getByText("Invalid login credentials.");
    expect(errorMessage).toBeInTheDocument();
  });
});
