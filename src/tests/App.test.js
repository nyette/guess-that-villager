import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { server } from "../mocks/server";
import { rest } from "msw";
import App from "../components/App";

it("handles user input", async () => {
  render(<App />);
  expect(screen.queryByText(/Guess That Villager/i)).toBeInTheDocument();
  // Play
  userEvent.click(screen.queryByText(/Play/i));
  expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
  const firstImg = await screen.findByAltText("villager");
  expect(firstImg).toHaveAttribute("src", "https://acnhapi.com/v1/icons/villagers/354");
  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  userEvent.type(screen.queryByRole("textbox"), "Pietro");
  expect(screen.queryByRole("textbox")).toHaveValue("Pietro");
  userEvent.click(screen.queryByText(/Submit/i));
  expect(screen.queryByText(/Correct/i)).toBeInTheDocument();
  // Start Next Round
  userEvent.click(screen.queryByText(/Start Next Round/i));
  expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
  const nextImg = await screen.findByAltText("villager");
  expect(nextImg).toHaveAttribute("src", "https://acnhapi.com/v1/icons/villagers/354");
  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  userEvent.type(screen.queryByRole("textbox"), "");
  expect(screen.queryByRole("textbox")).toHaveValue("");
  userEvent.click(screen.queryByText(/Submit/i));
  expect(screen.queryByText(/Game Over/i)).toBeInTheDocument();
  // Replay
  expect(screen.queryByText(/Replay/i)).toBeInTheDocument();
  // Return To Main Menu
  userEvent.click(screen.queryByText(/Return To Main Menu/i));
  expect(screen.queryByText(/Guess That Villager/i)).toBeInTheDocument();
});

it("tells the user about any errors", async () => {
  server.use(
    rest.get("https://acnhapi.com/v1/villagers/*", (req, res, ctx) => {
      return res(
        ctx.status(404)
      )
    })
  );
  render(<App />);
  expect(screen.queryByText(/Guess That Villager/i)).toBeInTheDocument();
  userEvent.click(screen.queryByText(/Play/i));
  expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
  await screen.findByText(/Error/i);
  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  // Return To Main Menu
  userEvent.click(screen.queryByText(/Return To Main Menu/i));
  expect(screen.queryByText(/Guess That Villager/i)).toBeInTheDocument();
});
