// REACT AND FRIENDS
import React from "react";
import { render } from "@testing-library/react";

// INTERNAL IMPORTS
import PlayReport from "../components/PlayReport";

describe("PlayReport component", () => {
  test("renders correctly with a perfect score", async () => {
    const { getByText } = render(<PlayReport cards={10} attempts={10} />);
    const score = getByText("100.0%");
    expect(score).toBeInTheDocument();
  });
  test("renders correctly with a 10% score", async () => {
    const { getByText } = render(<PlayReport cards={10} attempts={100} />);
    const score = getByText("10.0%");
    expect(score).toBeInTheDocument();
  });
  test("renders correctly with a score that requires rounding", async () => {
    const { getByText } = render(<PlayReport cards={20} attempts={30} />);
    const score = getByText("66.7%");
    expect(score).toBeInTheDocument();
  });
});
