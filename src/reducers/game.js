export const initialGame = {
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

export const gameReducer = (game, action) => {
  switch (action.type) {
    case "CATCH_ERROR":
      return {
        ...game,
        error: action.data,
      };
    case "PLAY":
      return {
        ...game,
        selectedOption: "Play",
        isRunning: true,
      };
    case "START_FETCH":
      return {
        ...game,
        isFetching: true,
      };
    case "END_FETCH":
      return {
        ...game,
        isFetching: false,
        villager: action.data,
      };
    case "DECREASE_TIME_LEFT":
      return {
        ...game,
        timeLeft: game.timeLeft - 1,
      };
    case "CHANGE_GUESS":
      return {
        ...game,
        guess: action.data,
      };
    case "SUBMIT_GUESS":
      return {
        ...game,
        guessWasSubmitted: true,
        timeLeft: 0,
      };
    case "CHECK_GUESS":
      return {
        ...game,
        guessWasCorrect: action.data,
      };
    case "CHANGE_MUSIC":
      return {
        ...game,
        music: action.data,
      };
    case "INCREASE_SCORE":
      return {
        ...game,
        score: game.score + 1,
      };
    case "CONTINUE":
      return {
        ...game,
        villager: null,
        guess: "",
        guessWasSubmitted: false,
        guessWasCorrect: null,
        timeLeft: 10,
      };
    case "REPLAY":
      return {
        ...initialGame,
        selectedOption: "Play",
        isRunning: true,
      };
    case "QUIT":
      return initialGame;
    default:
      return game;
  }
};
