import React, { useContext } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../store/cart-context";
import "./cart.scss";
import CartItem from "./cartItem/cartItem";
const Cart = (props) => {
  const cart = useContext(cartContext);
  const addMoreHandler = (id, size) => {
    cart.addItem(id, 1, size);
  };
  const removeItemsHandler = (id, amount = 1, size = null) => {
    cart.removeItem(id, amount, size);
  };

  const cartItems = cart.items.map((item) => {
    if (item.amountInCart === 0) {
      return;
    }

    return (
      <CartItem
        name={item.name}
        price={item.price}
        img={item.url}
        amountInCart={item.amountInCart}
        addMore={() => {
          addMoreHandler(item.id, item.chosenSize);
        }}
        removeItems={() => {
          removeItemsHandler(item.id, 1, item.chosenSize);
        }}
        removeAllItems={() => {
          removeItemsHandler(item.id, item.amountInCart, item.chosenSize);
        }}
        id={item.id}
        key={item.name + item.chosenSize}
        size={item.chosenSize}
      />
    );
  });

  return (
    <React.Fragment>
      <div
        className={[
          "cart d-flex justify-content-center align-items-start",
          props.toggleCart,
        ].join(" ")}
      >
        <div className="container  my-3 mx-3 ">
          <div className="d-flex justify-content-between mt-4 closeOptions align-items-center">
            {cart.items.length ? <h4>Items</h4> : <h4>No items</h4>}
            <button className="close-btn" onClick={props.toggleCartHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>

          <ul className="my-4">{cartItems}</ul>
          <div className="checkout my-2">
            <h5>Total Price</h5>
            <p className="fw-bold">$ {cart.totalPrice}</p>
            <Link
              to={"/checkout/login"}
              className="btn btn-primary w-100 py-2"
              onClick={() => {
                props.toggleCartHandler("hide");
              }}
              disabled={!cart.items.length}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
      <div
        className={["backdrop", props.toggleCart].join(" ")}
        onClick={props.toggleCartHandler}
      ></div>
    </React.Fragment>
  );
};

export default Cart;
