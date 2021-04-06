/* eslint-disable no-undef */
// The above line is needed to prevent re-declaration of fetchMock,
// which is already declared in setupTests.js

// REACT AND FRIENDS
import React from "react";
import { render, waitFor } from "@testing-library/react";

// INTERNAL IMPORTS
import App from "../App";

describe("App", () => {
  test("Sanity check: does the page render?", async () => {
    const mockUser = {
      id: "000000000000000000000000",
      name: "mocktest",
    };
    fetchMock.mockOnce(JSON.stringify(mockUser));
    const { getByText } = render(<App />);
    const title = getByText(/Musicards/);
    await waitFor(() => {
      expect(title).toBeInTheDocument();
    });
  });
});
