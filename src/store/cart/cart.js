/* eslint-disable array-callback-return */
import { configureStore, createSlice } from "@reduxjs/toolkit";
// import  {addToCart} from './cartHttpActions'

const initialCartState = {
  items: [],
  totalPrice: 0,
  itemsAmount: 0,
};
const findItem = (id, items, checkForDuplicate = false, size) => {
  let existingCartItem;
  if (checkForDuplicate) {
    existingCartItem = items.findIndex((item) => {
      if (item === null) return;
      else return item._id.trim() === id.trim() && item.chosenSize === size;
    });
  } else {
    existingCartItem = items.findIndex((item) => {
      if (item === null) return;
      else return item._id.trim() === id.trim();
    });
  }

  const currItem = items[existingCartItem];
  return currItem;
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, actions) {
      console.log("reducer add item");
      let chosenItem = findItem(
        actions.payload.itemId,
        state.items,
        true,
        actions.payload.chosenSize
      );

      let updatedItem;
      if (chosenItem === undefined) {
        chosenItem = findItem(
          actions.payload.itemId,
          actions.payload.DB,
          false,
          actions.payload.chosenSize
        );

        updatedItem = {
          ...chosenItem,
          amountInCart: 1,
          chosenSize: actions.payload.chosenSize,
        };

        state.items.push(updatedItem);
        const updatedPrice = state.totalPrice + chosenItem.price * 1;
        const newItemsAmount = (state.itemsAmount += 1);
        state.itemsAmount = newItemsAmount;
        state.totalPrice = updatedPrice;
      } else {
        const existingCartItem = state.items.findIndex(
          (item) =>
            item._id === actions.payload.itemId &&
            item.chosenSize === actions.payload.chosenSize
        );

        const updatedPrice = state.totalPrice + chosenItem.price * 1;
        const newItemsAmount = state.itemsAmount + 1;

        updatedItem = {
          ...chosenItem,
          amountInCart: chosenItem.amountInCart + 1,
          chosenSize: actions.payload.chosenSize,
        };

        state.items[existingCartItem] = updatedItem;

        state.totalPrice = updatedPrice;
        state.itemsAmount = newItemsAmount;
      }
    },
    removeItem(state, actions) {
      let existingCartItem;
      if (actions.payload.chosenSize === null) {
        existingCartItem = state.items.findIndex(
          (item) => item._id === actions.payload.itemId
        );
      } else {
        existingCartItem = state.items.findIndex(
          (item) =>
            item._id === actions.payload.itemId &&
            actions.payload.chosenSize === item.chosenSize
        );
      }

      let currItem = state.items[existingCartItem];
      let updatedItem;
      let updatedPrice =
        state.totalPrice - currItem.price * actions.payload.qty;
      let updatedItems;
      let newItemsAmount;

      if (currItem.amountInCart <= 1) {
        updatedItems = [...state.items];
        if (actions.payload.chosenSize === null) {
          updatedItems = state.items.filter(
            (item) => item._id !== actions.payload.itemId
          );
        } else {
          updatedItems = state.items.filter(
            (item) =>
              item._id !== actions.payload.itemId ||
              item.chosenSize !== actions.payload.chosenSize
          );
        }
      } else {
        updatedItem = {
          ...currItem,
          amountInCart: currItem.amountInCart - actions.payload.qty,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItem] = updatedItem;
      }
      newItemsAmount = state.itemsAmount - actions.payload.qty;
      if (newItemsAmount <= 0) {
        newItemsAmount = 0;
      }
      if (updatedPrice <= 0) {
        updatedPrice = 0;
      }
      state.items = updatedItems;
      state.totalPrice = updatedPrice;
      state.itemsAmount = newItemsAmount;
    },
    setCart(state, actions) {
      state.items = actions.payload.items.map((item) => {
        return item.itemId;
      });
      state.totalPrice = actions.payload.totalPrice;
      state.itemsAmount = actions.payload.itemsAmount;
    },
  },
});

export const cartActions = cartSlice.actions;
