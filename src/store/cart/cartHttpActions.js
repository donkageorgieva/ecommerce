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
  return (dispatch) => {
    dispatch(
      cartActions.setCart({
        items: cart.items,
        totalPrice: cart.totalPrice,
        itemsAmount: cart.itemsAmount,
      })
    );
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
