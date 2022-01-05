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

export const addToCart = (product, token) => {
  return (dispatch) => {
    return (
      fetch("http://localhost:8080/cart/add-to-cart", {
        method: "POST",
        body: JSON.stringify({
          itemId: product.itemId,
          chosenSize: product.chosenSize,
        }),

        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed!");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        // .then((result) => {

        // })
        .catch((err) => {
          console.log(err);
        })
    );
  };
};
