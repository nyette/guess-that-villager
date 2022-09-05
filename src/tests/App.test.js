import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { server } from "../mocks/server";
import { rest } from "msw";
import App from "../components/App";

it("handles user input", async () => {
  render(<App />);
  expect(screen.getByText(/Guess That Villager/i)).toBeInTheDocument();
  // Play
  userEvent.click(screen.getByText(/Play/i));
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  const firstImg = await screen.findByAltText("villager");
  expect(firstImg).toHaveAttribute(
    "src",
    "https://acnhapi.com/v1/icons/villagers/354"
  );
  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  userEvent.type(screen.getByRole("textbox"), "Pietro");
  expect(screen.getByRole("textbox")).toHaveValue("Pietro");
  userEvent.click(screen.getByText(/Submit/i));
  expect(screen.getByText(/Correct/i)).toBeInTheDocument();
  // Start Next Round
  userEvent.click(screen.getByText(/Start Next Round/i));
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  const nextImg = await screen.findByAltText("villager");
  expect(nextImg).toHaveAttribute(
    "src",
    "https://acnhapi.com/v1/icons/villagers/354"
  );
  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveValue("");
  expect(screen.getByText("Submit (10)")).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(screen.getByText("Submitted")).toBeInTheDocument();
  await screen.findByText(/Game Over/i);
  // Replay
  expect(screen.getByText(/Replay/i)).toBeInTheDocument();
  // Return To Main Menu
  userEvent.click(screen.getByText(/Return To Main Menu/i));
  expect(screen.getByText(/Guess That Villager/i)).toBeInTheDocument();
});

it("tells the user about any errors", async () => {
  server.use(
    rest.get("https://acnhapi.com/v1/villagers/*", (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );
  render(<App />);
  expect(screen.getByText(/Guess That Villager/i)).toBeInTheDocument();
  userEvent.click(screen.getByText(/Play/i));
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await screen.findByText(/Error/i);
  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  // Return To Main Menu
  userEvent.click(screen.getByText(/Return To Main Menu/i));
  expect(screen.getByText(/Guess That Villager/i)).toBeInTheDocument();
});
