import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import { motion } from "framer-motion";
import { animationVariantsY } from "../utility/animation-variants/animation-variants";
const Header = () => {
  return (
    <motion.header
      variants={animationVariantsY}
      initial="hidden"
      className="d-flex flex-wrap justify-content-center align-items-center my-4"
      animate="visible"
      exit="exit"
    >
      <form>
        <h1>What's new?</h1>

        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="btn btn-primary px-2 py-2 d-flex align-items-center justify-content-center shadow-none"
            style={{ width: "100%" }}
          >
            Browse Now
          </motion.button>
        </Link>
      </form>
    </motion.header>
  );
};

export default Header;
