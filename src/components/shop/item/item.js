import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CartContext from "../../../store/cart-context";
import SizeButtons from "../size-button/size-buttons";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import useSendRequest from "../../../hooks/http-hook";
const Item = (props) => {
  const dispatch = useDispatch();
  // const cart = useContext(CartContext);
  const [size, setSize] = useState(null);

  return (
    <React.Fragment>
      <form className="card  border-0 shadow-sm me-2 ">
        <div className="imgContainer">
          <Link to={["/shop/view", props.id].join(" ")}>
            {" "}
            <img
              className="card-img-top"
              src={props.img}
              alt={props.name}
            />{" "}
          </Link>
        </div>

        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">$ {props.price}</p>

          <ul className="d-flex justify-content-start">
            <SizeButtons
              sizes={props.sizes}
              choseSize={(chosenSize) => {
                setSize(chosenSize);
              }}
            />
          </ul>

          <button
            className="btn btn-primary my-3"
            onClick={(e) => {
              e.preventDefault();
              if (size === null) {
                props.sizeError(true, props.id);
              } else {
                props.toggleCartHandler();
                // cart.addItem(props.id, 1, size);
                dispatch(
                  cartActions.addItem({
                    itemId: props.id,
                    DB: props.DB,
                    chosenSize: size,
                  })
                );
                setSize(null);
                props.sizeError(false);
              }
            }}
          >
            Add to Cart
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Item;
