import { Link } from "react-router-dom";
import styles from "./header.module.scss";
const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center align-items-center ">
      <form>
        <h1>What's new?</h1>
        <Link
          to="/shop"
          className=" btn-primary px-2 py-2 d-flex align-items-center justify-content-center shadow-none"
        >
          Browse Now
        </Link>
      </form>
    </header>
  );
};

export default Header;
