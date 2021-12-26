import { cartActions } from "../store/index";

export const sendCart = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://sneakers-65e0b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "POST",
          body: JSON.stringify(cart),
        }
      );
      return await response.json();
    };
    try {
      await sendRequest();
    } catch (error) {
      alert("COULD NOT SEND CART");
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
