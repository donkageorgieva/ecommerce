import { cartActions } from "./cart";
import { userActions } from "../user/user";

//get cart from backend
export const getCart = (token) => {
  return async (dispatch) => {
    return fetch("http://localhost:8080/cart", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const cartPayload = {
          ...data,
          isLoggedIn: data && true,
        };
        dispatch(cartActions.setCart(cartPayload));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//post cart to backend
export const sendCart = (token, cart, shouldLogOut) => {
  console.log(cart, "cart to send !!");
  return async (dispatch) => {
    return fetch("http://localhost:8080/cart", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cart,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        if (shouldLogOut) {
          dispatch(userActions.logout());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
