// REACT AND FRIENDS
import React from "react";
import { render } from "@testing-library/react";

// INTERNAL IMPORTS
import AllDecks from "../components/AllDecks";

describe("AllDecks component", () => {
  test("displays loader", () => {
    const { getByLabelText } = render(<AllDecks />);
    const loader = getByLabelText(/loading/);
    expect(loader).toBeInTheDocument();
  });
});
