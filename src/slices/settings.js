import { createSlice } from "@reduxjs/toolkit";
import resetState from "../helpers/resetState";

export const modes = {
  dark: {
    background: "black",
    color: "white",
  },
  light: {
    background: "white",
    color: "black",
  },
};

const initialSettings = {
  mode: "dark",
  responseType: "text",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    enableDarkMode: (state) => {
      state.mode = "dark";
    },
    enableLightMode: (state) => {
      state.mode = "light";
    },
    enableText: (state) => {
      state.responseType = "text";
    },
    enableVoice: (state) => {
      state.responseType = "voice";
    },
    reset: (state) => {
      state = resetState(state, initialSettings);
    },
  },
});

export const {
  enableDarkMode,
  enableLightMode,
  enableText,
  enableVoice,
  reset,
} = settingsSlice.actions;

export default settingsSlice.reducer;
