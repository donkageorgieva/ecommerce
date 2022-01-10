import { cartActions } from "./cart";

export const transferCart = (token, shouldSend = false, cart = null) => {
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
        console.log(data, "DATA from request");
      })
      .catch((err) => {
        throw err;
      });
  };
};
// export const sendCart = (cart, token) => {
//   console.log("sendCart");
//   return async (dispatch) => {
//     dispatch(
//       cartActions.setCart({
//         items: cart.items,
//         totalPrice: cart.totalPrice,
//         itemsAmount: cart.itemsAmount,
//       })
//     );

//     return fetch("http://localhost:8080/cart", {
//       method: "POST",
//       body: JSON.stringify({
//         cart: cart,
//       }),

//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         response.json();
//       })
//       .then()
//       .catch((err) => {
//         if (err) {
//           throw err;
//         }
//       });
//   };
// };
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
