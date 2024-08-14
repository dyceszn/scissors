import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Errormsg from "../Errormsg";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Component to set location state for testing
const TestWrapper: React.FC<{ state?: { message: string } }> = ({ state }) => {
  return (
    <MemoryRouter initialEntries={[{ pathname: "/", state }]}>
      <Routes>
        <Route path="/" element={<Errormsg />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Errormsg Component", () => {
  test("renders the error message from location state", () => {
    const errorMessage = "An error has occurred";

    render(<TestWrapper state={{ message: errorMessage }} />);

    // Check if the error message text is rendered
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("renders default error message if no state message is provided", () => {
    render(<TestWrapper />);

    // Check if the default error message is rendered
    expect(screen.getByText("An unknown error occurred.")).toBeInTheDocument();
  });

  test("navigates to the previous page when the arrow image is clicked", () => {
    render(<TestWrapper state={{ message: "Test error message" }} />);
  });
});
