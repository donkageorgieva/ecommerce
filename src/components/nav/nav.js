import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import cartContext from "../../store/cart-context";
import "./nav.scss";
const Nav = (props) => {
  const cart = useContext(cartContext);
  const [showNav, setShowNav] = useState(false);
  const navOptions = [
    {
      title: "home",
      link: "/",
    },
    {
      title: "shop",
      link: "/shop",
    },
  ];
  const toggleNavbar = () => {
    const isNavShown = !showNav;

    setShowNav(isNavShown);
  };

  return (
    <nav className="d-lg-flex navbar navbar-expand-lg navbar-light align-items-center justify-content-between py-1 mt-4">
      <button
        className="navbar-toggler collapsed  shadow-none"
        onClick={toggleNavbar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <form className="form d-flex  ms-auto">
        <NavLink
          to="/checkout"
          className=" me-2 btn btn-primary px-2 d-flex align-items-center justify-content-center shadow-none"
          type="button"
        >
          {" "}
          Checkout
        </NavLink>
        <button
          onClick={props.toggleCartHandler}
          className="btn btn-outline-primary px-2 d-flex align-items-center  shadow-none "
          type="button"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mx-1"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>{" "}
          Bag <span className="px-1">({cart.itemsAmount})</span>
        </button>
      </form>
      <div
        className={
          showNav ? "navbar-collapse px-2 " : "collapse navbar-collapse px-0"
        }
      >
        <ul className="navbar-nav me-auto">
          {navOptions.map((option) => {
            return (
              <li key={option.title} className="nav-item px-1">
                <NavLink
                  to={option.link}
                  className="nav-link"
                  href={option.link}
                >
                  {option.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
