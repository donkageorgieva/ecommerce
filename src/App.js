import { useState } from "react";
import { Route } from "react-router-dom";
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
function App() {
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
            <Route path="/" exact>
              {" "}
              <Header />{" "}
            </Route>
            <Route path="/shop" exact>
              {" "}
              <Shop toggleCartHandler={toggleCartHandler} />{" "}
            </Route>
            <Route path="/shop/view:itemName">
              {" "}
              <ItemViewer />{" "}
            </Route>
            <Route path="/checkout" exact>
              {" "}
              <Login />{" "}
            </Route>
            <Route path="/checkout/signUp" exact>
              {" "}
              <Register />{" "}
            </Route>
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
