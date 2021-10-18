import { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Sass/App.scss";
import ReactDOM from "react-dom";
import Nav from "./components/nav/nav";
import Header from "./components/header/header";
import Shop from "./components/shop/shop";
import CartProvider from "./store/CartProvider";
import Cart from "../src/components/cart/cart";
import ItemViewer from "./components/shop/item-viewer/item-vieiwer";
import Login from "./components/checkout/login/login";
import Register from "./components/checkout/register/register";
import { motion, AnimatePresence } from "framer-motion";
function App() {
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
    <CartProvider>
      <div className="App">
        <div className="container">
          <Nav toggleCartHandler={toggleCartHandler} />

          <main>
            <AnimatePresence>
              <Switch location={location} key={location.key}>
                <Route path="/shop/view:itemName">
                  {" "}
                  <ItemViewer toggleCart={toggleCartHandler} />{" "}
                </Route>
                <Route path="/shop">
                  {" "}
                  <Shop toggleCartHandler={toggleCartHandler} />{" "}
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
                  <Header />{" "}
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
    </CartProvider>
  );
}

export default App;
