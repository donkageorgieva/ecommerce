import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cart";
import { userSlice } from "./user/user";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});
