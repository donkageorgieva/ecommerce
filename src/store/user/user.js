import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  userId: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, actions) {
      state.email = actions.payload.email;
      state.userId = actions.payload.userId;
      state.token = actions.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.email = "";
      state.userId = "";
      state.token = "";
      state.isLoggedIn = false;
      console.log("logging out");
    },
  },
});

export const userActions = userSlice.actions;
