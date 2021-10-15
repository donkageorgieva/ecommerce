import React from "react";

const cartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  itemsAmount: 0,
});

export default cartContext;
