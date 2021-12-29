import { cartActions } from "../store/index";

export const addToCart = (product) => {
  return async (dispatch, getState) => {
    dispatch(cartActions.addItem(product));
    const state = getState();
    const addedItem = state.cart.items.find(
      (item) => item._id.toString() === product.itemId.toString()
    );

    const sendRequest = async () => {
      console.log("SENDING req");
      const response = await fetch("http://localhost:8080/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedItem),
      });
      return await response.json();
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error, "ERROR");
    }
  };
};

export const getCart = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8080/cart");
      const data = await response.json();
      return data;
    };

    try {
      const data = await sendRequest();
      if (!data.items) {
        return;
      }

      dispatch(cartActions.setCart(data));
    } catch (error) {
      alert("COULD NOT FETCH DATA");
    }
  };
};
