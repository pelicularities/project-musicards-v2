/* eslint-disable no-undef */
// The above line is needed to avoid re-declaration of fetchMock,
// which is already declared in setupTests.js

// REACT AND FRIENDS
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// INTERNAL IMPORTS
import AllDecks from "../components/AllDecks";

describe("AllDecks component", () => {
  test("displays loader", async () => {
    const mockDecks = [
      { _id: 1, title: "Test Deck 1", description: "Description 1", cards: [] },
      { _id: 2, title: "Test Deck 2", description: "Description 2", cards: [] },
    ];
    fetchMock.mockOnce(JSON.stringify(mockDecks));
    const { getByLabelText } = render(
      <BrowserRouter>
        <AllDecks />
      </BrowserRouter>
    );
    await waitFor(() => {
      const loader = getByLabelText(/loading/);
      expect(loader).toBeInTheDocument();
    });
  });
});
