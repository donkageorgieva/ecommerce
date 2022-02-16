/* eslint-disable array-callback-return */
import "./size-buttons.scss";
import { useRef } from "react";
import { useEffect } from "react";
const SizeButtons = (props) => {
  const sizesRef = useRef([]);
  useEffect(() => {
    sizesRef.current = sizesRef.current.slice(0, props.sizes.length);
  }, [props.sizes]);
  const btns = props.sizes.map((size, i) => {
    if (size === null) {
      return;
    } else {
      return (
        <li key={size} id={size}>
          <button
            ref={(el) => (sizesRef.current[i] = el)}
            className="size-btn me-1 my-1"
            onClick={(e) => {
              props.choseSize(sizesRef.current[i].innerHTML);
              e.preventDefault();
            }}
          >
            {size}
          </button>
        </li>
      );
    }
  });

  return btns;
};

export default SizeButtons;
