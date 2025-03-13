jest.mock("../services/ExerciseApi", () => ({
  fetchTargets: jest.fn(), // Mock fetchTargets only
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TargetFilter from "../components/TargetFilter";
import { fetchTargets } from "../services/ExerciseApi";

test("renders dropdown with default option", async () => {
  fetchTargets.mockResolvedValue(["Chest", "Back", "Legs"]);

  render(<TargetFilter onFilterChange={jest.fn()} />);

  const selectElement = screen.getByRole("combobox");
  expect(selectElement).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Chest")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByText("Legs")).toBeInTheDocument();
  });
});

test("calls fetchTargets on mount", async () => {
  fetchTargets.mockResolvedValue(["Arms", "Shoulders"]);

  render(<TargetFilter onFilterChange={jest.fn()} />);

  await waitFor(() => {
    expect(fetchTargets).toHaveBeenCalledTimes(1);
  });
});

test("updates selected target and calls onFilterChange", async () => {
  fetchTargets.mockResolvedValue(["Biceps", "Triceps"]);
  const onFilterChangeMock = jest.fn();

  render(<TargetFilter onFilterChange={onFilterChangeMock} />);

  await waitFor(() => {
    expect(screen.getByText("Biceps")).toBeInTheDocument();
    expect(screen.getByText("Triceps")).toBeInTheDocument();
  });

  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Triceps" } });

  expect(onFilterChangeMock).toHaveBeenCalledWith("Triceps");
});
