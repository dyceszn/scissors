// Footer.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../Footer";

test("renders Footer component correctly", () => {
  render(<Footer />);

  // Check if the div with the correct class is rendered
  const footerDiv = screen.getByRole("contentinfo");
  expect(footerDiv).toBeInTheDocument();

  // Check if the paragraph element is rendered with correct text
  const paragraph = screen.getByText(/© dyceszn 2024/i);
  expect(paragraph).toBeInTheDocument();
});
