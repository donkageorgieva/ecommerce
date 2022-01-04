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
      const newUserState = {
        ...state,
        isLoggedIn: true,
        email: actions.payload.email,
        userId: actions.payload.userId,
        token: actions.payload.token,
      };
      state = newUserState;
    },
    logout(state, actions) {},
  },
});

export const userActions = userSlice.actions;
