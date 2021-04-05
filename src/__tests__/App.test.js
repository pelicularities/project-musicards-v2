// REACT AND FRIENDS
import React from "react";
import { render } from "@testing-library/react";

// INTERNAL IMPORTS
import App from "../App";
test("not actually a test", () => {
  const { getByText } = render(<App />);
  const title = getByText(/Musicards/);
  expect(title).toBeInTheDocument();
});
