import { createSlice } from "@reduxjs/toolkit";
import resetState from "../helpers/resetState";

const initialGame = {
  error: null,
  selectedOption: null,
  isRunning: false,
  isFetching: false,
  villager: null,
  guess: "",
  guessWasSubmitted: false,
  guessWasCorrect: null,
  music: null,
  score: 0,
  timeLeft: 10,
};

export const gameSlice = createSlice({
  name: "game",
  initialState: initialGame,
  reducers: {
    play: (state) => {
      state.selectedOption = "Play";
      state.isRunning = true;
    },
    startFetch: (state) => {
      state.isFetching = true;
    },
    endFetch: (state, action) => {
      state.isFetching = false;
      state.villager = action.payload;
    },
    catchError: (state, action) => {
      state.error = action.payload;
    },
    handleMusic: (state) => {
      state.music = "/assets/music/timer.mp3";
    },
    decreaseTimeLeft: (state) => {
      state.timeLeft -= 1;
    },
    changeGuess: (state, action) => {
      state.guess = action.payload;
    },
    handleCorrectGuess: (state) => {
      state.guessWasSubmitted = true;
      state.guessWasCorrect = true;
      state.score += 1;
      state.music = "/assets/music/correct.mp3";
      state.timeLeft = 0;
    },
    handleWrongGuess: (state) => {
      state.guessWasSubmitted = true;
      state.guessWasCorrect = false;
      state.music = "/assets/music/wrong.mp3";
      state.timeLeft = 0;
    },
    startNextRound: (state) => {
      state.villager = null;
      state.guess = "";
      state.guessWasSubmitted = false;
      state.guessWasCorrect = null;
      state.timeLeft = 10;
    },
    replay: (state) => {
      state = resetState(state, initialGame);
      state.selectedOption = "Play";
      state.isRunning = true;
    },
    quit: (state) => {
      state = resetState(state, initialGame);
    },
  },
});

export const {
  play,
  startFetch,
  endFetch,
  catchError,
  handleMusic,
  decreaseTimeLeft,
  changeGuess,
  handleCorrectGuess,
  handleWrongGuess,
  startNextRound,
  replay,
  quit,
} = gameSlice.actions;

export default gameSlice.reducer;
