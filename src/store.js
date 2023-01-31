import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/game";
import settingsReducer from "./slices/settings";

export default configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
  },
});
