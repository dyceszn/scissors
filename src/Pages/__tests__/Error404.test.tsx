import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Error404 from "../Error404";

describe("Error404 Component", () => {
  test("renders Error 404 text", () => {
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>
    );

    // Check if Error 404 text is rendered
    expect(screen.getByText("Error 404")).toBeInTheDocument();
  });
});
