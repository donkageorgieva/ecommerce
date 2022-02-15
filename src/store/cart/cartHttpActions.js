import { cartActions } from "./cart";
import { userActions } from "../user/user";

//get cart from backend
export const getCart = (token) => {
  return async (dispatch) => {
    return fetch("https://ecom-api-nodejs.herokuapp.com/cart", {
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
        console.log(data, "data recieved");
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
    return fetch("https://ecom-api-nodejs.herokuapp.com/cart", {
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
        console.log(shouldLogOut, "are we logging out");
        return response.json();
      })
      .then(shouldLogOut && dispatch(userActions.logout()))
      .catch((err) => {
        console.log(err);
      });
  };
};
