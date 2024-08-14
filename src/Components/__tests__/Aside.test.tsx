// Aside.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Aside from "../Aside";

test("renders Aside component correctly", () => {
  render(<Aside />);

  // Check if the main div is rendered using test id
  const mainDiv = screen.getByTestId("main-div");
  expect(mainDiv).toBeInTheDocument();

  // Check if the h1 element is rendered with correct text
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Make your link as short as possible");

  // Check if the hr element is rendered
  const hrElement = screen.getByRole("separator");
  expect(hrElement).toBeInTheDocument();
});
