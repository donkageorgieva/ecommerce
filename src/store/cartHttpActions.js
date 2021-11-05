export const sendCart = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://sneakers-65e0b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            itemsAmount: cart.itemsAmount,
            totalPrice: cart.totalPrice,
          }),
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
  return async (dispatch) => {};
};
