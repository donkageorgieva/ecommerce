import { configureStore, createSlice } from "@reduxjs/toolkit";

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
      else return item.id === id && item.chosenSize === size;
    });
  } else {
    existingCartItem = items.findIndex((item) => {
      if (item === null) return;
      else return item.id === id;
    });
  }

  const currItem = items[existingCartItem];
  return currItem;
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, actions) {
      if (
        findItem(
          actions.payload.itemId,
          state.items,
          true,
          actions.payload.chosenSize
        ) === undefined
      ) {
        let chosenItem = findItem(
          actions.payload.itemId,
          actions.payload.DB,
          false,
          actions.payload.chosenSize
        );

        chosenItem = {
          ...chosenItem,
          amountInCart: chosenItem.amountInCart + 1,
          chosenSize: actions.payload.chosenSize,
        };

        state.items.push(chosenItem);
        const updatedPrice = state.totalPrice + chosenItem.price * 1;
        const newItemsAmount = (state.itemsAmount += 1);
        state.itemsAmount = newItemsAmount;
        state.totalPrice = updatedPrice;
      } else {
        const existingCartItem = state.items.findIndex(
          (item) =>
            item.id === actions.payload.itemId &&
            item.chosenSize === actions.payload.chosenSize
        );
        const currItem = findItem(
          actions.payload.itemId,
          state.items,
          true,
          actions.payload.chosenSize
        );

        const updatedPrice = state.totalPrice + currItem.price * 1;
        const newItemsAmount = state.itemsAmount + 1;
        let updatedItem;

        if (currItem) {
          updatedItem = {
            ...currItem,
            amountInCart: currItem.amountInCart + 1,
            chosenSize: actions.payload.chosenSize,
          };

          state.items[existingCartItem] = updatedItem;
        }

        state.totalPrice = updatedPrice;
        state.itemsAmount = newItemsAmount;
      }
    },
    removeItem(state, actions) {
      let existingCartItem;
      if (actions.payload.chosenSize === null) {
        existingCartItem = state.items.findIndex(
          (item) => item.id === actions.payload.itemId
        );
      } else {
        existingCartItem = state.items.findIndex(
          (item) =>
            item.id === actions.payload.itemId &&
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
            (item) => item.id !== actions.payload.itemId
          );
        } else {
          updatedItems = state.items.filter(
            (item) =>
              item.id !== actions.payload.itemId ||
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
  },
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
export const cartActions = cartSlice.actions;
