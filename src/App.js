import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Sass/App.scss";
import ReactDOM from "react-dom";
import Nav from "./components/nav/nav";
import Header from "./components/header/header";
import Shop from "./components/shop/shop";
import Cart from "../src/components/cart/cart";
import ItemViewer from "./components/shop/item-viewer/item-vieiwer";
import Login from "./components/checkout/login/login";
import Register from "./components/checkout/register/register";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { sendCart, getCart } from "./store/cartHttpActions";
import { cartActions } from "./store/index";

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.length <= 0) {
      dispatch(getCart());
    } else {
      const newCart = JSON.parse(localStorage.getItem("cart"));
      dispatch(
        cartActions.setCart({
          items: newCart.items,
          totalPrice: newCart.totalPrice,
          itemsAmount: newCart.itemsAmount,
        })
      );
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const location = useLocation();
  const [toggleCart, setToggleCart] = useState("hide");
  const toggleCartHandler = () => {
    if (toggleCart === "") {
      setToggleCart("hide");
    } else {
      setToggleCart("");
    }
  };
  return (
    <React.Fragment>
      <div className="App">
        <div className="container">
          <Nav toggleCartHandler={toggleCartHandler} />
          <main>
            <AnimatePresence>
              <Switch location={location} key={location.key}>
                <Route path="/shop/view:itemId">
                  {" "}
                  <ItemViewer toggleCart={toggleCartHandler} />{" "}
                </Route>

                <Route path="/checkout/login">
                  {" "}
                  <Login />{" "}
                </Route>
                <Route path="/checkout/signUp">
                  {" "}
                  <Register />{" "}
                </Route>
                <Route path="/">
                  {" "}
                  <Header /> <Shop toggleCartHandler={toggleCartHandler} />{" "}
                </Route>
              </Switch>
            </AnimatePresence>
          </main>
        </div>
      </div>
      {ReactDOM.createPortal(
        <Cart toggleCartHandler={toggleCartHandler} toggleCart={toggleCart} />,
        document.getElementById("cart")
      )}
    </React.Fragment>
  );
}

export default App;
