import "./size-buttons.scss";
import react from "react";
import { useRef } from "react";
import { useEffect } from "react/cjs/react.development";
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
            className="size-btn me-2 my-1"
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
