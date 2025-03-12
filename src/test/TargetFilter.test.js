jest.mock("../services/ExerciseApi");

// Mock import.meta.env for Jest
global.importMeta = { env: { VITE_RAPID_API_KEY: "mocked-api-key" } };

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TargetFilter from "../components/TargetFilter";
import { fetchTargets } from "../services/ExerciseApi";

// Mock the API function
jest.mock("../services/ExerciseApi");

test("renders dropdown with default option", async () => {
  // 1️⃣ Mock API response to return an array of targets
  fetchTargets.mockResolvedValue(["Chest", "Back", "Legs"]);

  // 2️⃣ Render the component
  render(<TargetFilter onFilterChange={jest.fn()} />);

  // 3️⃣ Check if dropdown exists
  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();

  // 4️⃣ Wait for the mocked targets to load
  await waitFor(() => {
    expect(screen.getByText("Chest")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByText("Legs")).toBeInTheDocument();
  });
});

test("calls fetchTargets on mount", async () => {
  // Mock API response
  fetchTargets.mockResolvedValue(["Arms", "Shoulders"]);

  // Render the component
  render(<TargetFilter onFilterChange={jest.fn()} />);

  // Ensure fetchTargets was called once
  await waitFor(() => {
    expect(fetchTargets).toHaveBeenCalledTimes(1);
  });
});

test("updates selected target and calls onFilterChange", async () => {
  // Mock API response
  fetchTargets.mockResolvedValue(["Biceps", "Triceps"]);

  // Mock function for onFilterChange
  const onFilterChangeMock = jest.fn();

  // Render component with mock function
  render(<TargetFilter onFilterChange={onFilterChangeMock} />);

  // Wait for targets to load
  await waitFor(() => {
    expect(screen.getByText("Biceps")).toBeInTheDocument();
    expect(screen.getByText("Triceps")).toBeInTheDocument();
  });

  // Simulate user selecting "Triceps"
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Triceps" } });

  // Check if onFilterChange was called with "Triceps"
  expect(onFilterChangeMock).toHaveBeenCalledWith("Triceps");
});
