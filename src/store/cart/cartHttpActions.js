import { cartActions } from "./cart";

export const transferCart = (token, shouldSend = false, cart = null) => {
  console.log(cart, "cart to send");
  return async (dispatch) => {
    return fetch("http://localhost:8080/cart", {
      method: shouldSend ? "POST" : "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: shouldSend
        ? JSON.stringify({
            cart: cart,
          })
        : null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data, "DATA SENT");
        const cartPayload = {
          ...data,
          isLoggedIn: data && true,
        };
        console.log(cartPayload, "payload");
        dispatch(cartActions.setCart(cartPayload));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const addToCart = (product, token, cart) => {
  return async (dispatch) => {
    dispatch(cartActions.addItem(product));
    const cartItem = cart.items.find(
      (item) => item._id.trim() === product.itemId
    );

    return fetch("http://localhost:8080/cart/add-to-cart", {
      method: "POST",
      body: JSON.stringify({
        itemId: cartItem._id,
        amountInCart: cartItem.amountInCart,
        chosenSize: cartItem.chosenSize,
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

      .catch((err) => {
        console.log(err);
      });
  };
};
