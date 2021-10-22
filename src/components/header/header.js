import { Link } from "react-router-dom";
import "./header.scss";
import { motion } from "framer-motion";
import { animationVariantsY } from "../utility/animation-variants/animation-variants";
import { buttonVariants } from "../utility/animation-variants/animation-variants";
const Header = () => {
  return (
    <motion.header
      variants={animationVariantsY}
      initial="hidden"
      className="d-flex  justify-content-center align-items-center my-4"
      animate="visible"
      exit="exit"
    >
      <form>
        <h1>What's new?</h1>

        <Link to="/shop">
          <motion.button
            variants={buttonVariants}
            whileHover="hoverInfinity"
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
