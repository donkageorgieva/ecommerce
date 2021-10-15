/* eslint-disable default-case */
import { useReducer, useEffect } from "react";
import CartContext from "./cart-context";

import useSendRequest from "../hooks/http-hook";

const defaultCartState = {
  items: [],
  totalPrice: 0,
  itemsAmount: 0,
};

const cartReducer = (state, actions) => {
  const findItem = (id, items, checkForDuplicate = false) => {
    let existingCartItem;
    if (checkForDuplicate) {
      existingCartItem = items.findIndex((item) => {
        if (item === null) return;
        else return item.id === id && item.chosenSize === actions.chosenSize;
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
  switch (actions.type) {
    case "ADD":
      if (findItem(actions.itemId, state.items, true) === undefined) {
        let chosenItem = findItem(actions.itemId, actions.DB);

        chosenItem = {
          ...chosenItem,
          amountInCart: chosenItem.amountInCart + 1,
          chosenSize: actions.chosenSize,
        };

        const updatedItems = state.items.concat(chosenItem);

        const updatedPrice = state.totalPrice + chosenItem.price * 1;
        const newItemsAmount = (state.itemsAmount += 1);
        return {
          items: updatedItems,
          totalPrice: updatedPrice,
          itemsAmount: newItemsAmount,
        };
      } else {
        const existingCartItem = state.items.findIndex(
          (item) =>
            item.id === actions.itemId && item.chosenSize === actions.chosenSize
        );
        const currItem = findItem(actions.itemId, state.items, true);

        const updatedPrice = state.totalPrice + currItem.price * 1;
        const newItemsAmount = state.itemsAmount + 1;
        let updatedItem;
        let newItems;
        if (currItem) {
          updatedItem = {
            ...currItem,
            amountInCart: currItem.amountInCart + 1,
            chosenSize: actions.chosenSize,
          };
          newItems = [...state.items];
          newItems[existingCartItem] = updatedItem;
        }

        return {
          items: newItems,
          totalPrice: updatedPrice,
          itemsAmount: newItemsAmount,
        };
      }

    case "REMOVE":
      let existingCartItem;
      if (actions.chosenSize === null) {
        existingCartItem = state.items.findIndex(
          (item) => item.id === actions.itemId
        );
      } else {
        existingCartItem = state.items.findIndex(
          (item) =>
            item.id === actions.itemId && actions.chosenSize === item.chosenSize
        );
      }

      let currItem = state.items[existingCartItem];
      let updatedItem;
      let updatedPrice = state.totalPrice - currItem.price * actions.qty;
      let updatedItems;
      let newItemsAmount;

      if (currItem.amountInCart <= 1) {
        updatedItems = [...state.items];
        if (actions.chosenSize === null) {
          updatedItems = state.items.filter(
            (item) => item.id !== actions.itemId
          );
        } else {
          updatedItems = state.items.filter(
            (item) =>
              item.id !== actions.itemId ||
              item.chosenSize !== actions.chosenSize
          );
        }
      } else {
        updatedItem = {
          ...currItem,
          amountInCart: currItem.amountInCart - actions.qty,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItem] = updatedItem;
      }
      newItemsAmount = state.itemsAmount - actions.qty;
      if (newItemsAmount <= 0) {
        newItemsAmount = 0;
      }
      if (updatedPrice <= 0) {
        updatedPrice = 0;
      }

      return {
        items: updatedItems,
        totalPrice: updatedPrice,
        itemsAmount: newItemsAmount,
      };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const { items: DB, sendRequest } = useSendRequest();

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (id, quantity, size) => {
    dispatchCartAction({ type: "ADD", itemId: id, DB: DB, chosenSize: size });
  };
  const removeItemFromCartHandler = (id, quantity = 1, size = null) => {
    dispatchCartAction({
      type: "REMOVE",
      itemId: id,
      DB: DB,
      qty: quantity,
      chosenSize: size,
    });
  };

  const cart = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    itemsAmount: cartState.itemsAmount,
    removeItem: removeItemFromCartHandler,
  };
  useEffect(() => {
    sendRequest({
      url: "https://sneakers-65e0b-default-rtdb.firebaseio.com/items.json",
    });
  }, [sendRequest]);
  return (
    <CartContext.Provider value={cart}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
