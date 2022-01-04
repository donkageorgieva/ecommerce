import { cartActions } from "./cart";

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

export const sendCart = (cart) => {
  return () => {
    fetch("http://localhost:8080/add-to-cart", {
      method: "POST",
      body: {
        cart: cart,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
