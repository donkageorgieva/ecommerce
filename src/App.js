import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./Sass/App.scss";
import ReactDOM from "react-dom";
import Nav from "./components/nav/nav";
import Header from "./components/header/header";
import Shop from "./components/shop/shop";
import Cart from "../src/components/cart/cart";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { sendCart, getCart } from "./store/cart/cartHttpActions";
import { cartActions } from "./store/cart/cart";

const ItemViewer = React.lazy(() =>
  import("./components/shop/item-viewer/item-vieiwer")
);
const Login = React.lazy(() => import("./components/checkout/login/login"));
const Register = React.lazy(() =>
  import("./components/checkout/register/register")
);
function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [toggleCart, setToggleCart] = useState("hide");

  const toggleCartHandler = () => {
    if (toggleCart === "") {
      setToggleCart("hide");
    } else {
      setToggleCart("");
    }
  };
  useEffect(() => {
    //check if user is logged in
    if (!user.isLoggedIn) {
      //add localstorage to the cart
      if (window.localStorage.cart) {
        const newCart = JSON.parse(localStorage.getItem("cart"));

        dispatch(
          cartActions.setCart({
            items: newCart.items,
            totalPrice: newCart.totalPrice,
            itemsAmount: newCart.itemsAmount,
          })
        );
      }
    } else {
      if (user.isLoggedIn) {
        if (window.localStorage.cart) {
          const newCart = JSON.parse(localStorage.getItem("cart"));

          if (newCart.items.length > 0 && newCart.itemsAmount > 0) {
            let newItems = newCart.items
              .filter((item) => item.amountInCart > 0)
              .map((i) => {
                return {
                  itemId: i._id,
                  amountInCart: parseInt(i.amountInCart),
                  price: i.price,
                  chosenSize: parseInt(i.chosenSize),
                };
              });

            newCart.items = newItems;

            dispatch(sendCart(user.token, newCart, false));
          } else {
            dispatch(getCart(user.token));
          }
        }
      }
    }
  }, [dispatch, user.isLoggedIn, user.token]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <React.Fragment>
      <div className="App">
        <div className="container">
          <Nav toggleCartHandler={toggleCartHandler} />
          <main>
            <AnimatePresence>
              <Suspense fallback={<h1> Loading ... </h1>}>
                <Routes location={location} key={location.key}>
                  <Route
                    path="/shop/view:itemId"
                    element={<ItemViewer toggleCart={toggleCartHandler} />}
                  ></Route>

                  <Route path="/checkout/login" element={<Login />}></Route>
                  <Route path="/checkout/signup" element={<Register />}></Route>
                  <Route
                    path="/"
                    element={
                      <React.Fragment>
                        <Header />{" "}
                        <Shop toggleCartHandler={toggleCartHandler} />
                      </React.Fragment>
                    }
                  ></Route>
                </Routes>
              </Suspense>
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
