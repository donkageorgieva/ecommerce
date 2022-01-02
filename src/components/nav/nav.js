import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./nav.scss";
const Nav = (props) => {
  const [showNav, setShowNav] = useState(false);
  const itemsAmount = useSelector((state) => state.cart.itemsAmount);

  const navOptions = [
    {
      title: "shop",
      link: "/",
    },
    {
      title: "log in",
      link: "/checkout/login",
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
        <Link
          to="/checkout/login"
          className=" me-2 btn btn-primary px-2 d-flex align-items-center justify-content-center shadow-none"
          type="button"
        >
          {" "}
          Checkout
        </Link>
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
          Bag <span className="px-1">({itemsAmount})</span>
        </button>
      </form>
      <div
        className={
          showNav
            ? "navbar-collapse d-flex flex-row flex-md-column justify-content-center align-items-center px-0 "
            : "collapse navbar-collapse px-0"
        }
      >
        <ul className="navbar-nav  px-lg-4 d-flex  flex-lg-row flex-md-column align-items-center">
          {navOptions.map((option) => {
            return (
              <li key={option.title} className="nav-item px-1">
                <NavLink
                  to={option.link}
                  className={(navData) =>
                    navData.isActive ? "nav-link active" : "nav-link"
                  }
                  href={option.link}
                  exact={true}
                  onClick={() => {
                    setShowNav(false);
                  }}
                >
                  {option.title.charAt(0).toUpperCase() + option.title.slice(1)}
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
