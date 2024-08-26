// Loading.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "../Loading";

test("renders Loading component correctly", () => {
  render(<Loading />);

  // To check if the div with data-testid="loading-spinner" is rendered
  const loadingDiv = screen.getByTestId("loading-spinner");
  expect(loadingDiv).toBeInTheDocument();

  // To check if the h1 element is rendered with correct text
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Loading...");
});
