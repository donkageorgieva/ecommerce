import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import SizeButtons from "../size-button/size-buttons";
import useSendRequest from "../../../hooks/http-hook";
import "./item-viewer.scss";
import { useState } from "react/cjs/react.development";
import Modal from "../../utility/modal/modal";
import { motion } from "framer-motion";
import { animationVariantsO } from "../../utility/animation-variants/animation-variants";
import { cartActions } from "../../../store/cart/cart";
import { useDispatch } from "react-redux";
const ItemViewer = (props) => {
  const { isLoading, items: item, sendRequest } = useSendRequest();
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const params = useParams();

  const toggleModalHandler = () => {
    const isModalShown = toggleModal;
    setToggleModal(!isModalShown);
  };
  const sizes = [];
  for (const key in item.sizes) {
    sizes.push(item.sizes[key]);
  }

  useEffect(() => {
    sendRequest({
      url: `http://localhost:8080/items/sneakers/view${params.itemId.trim()}`,
    });
  }, [sendRequest, params.itemId]);
  return (
    <React.Fragment>
      {toggleModal
        ? ReactDOM.createPortal(
            <Modal
              title="Invalid size"
              body="Do you want to choose a size now?"
              positiveAction="Ok"
              negativeAction="Cancel"
              negativeActionFnc={toggleModalHandler}
              link={params.itemId}
              linkToItem={false}
            />,
            document.getElementById("modal")
          )
        : null}
      <motion.div
        className="d-flex my-4 "
        variants={animationVariantsO}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="img-wrapper me-4">
          <img src={item.url} className="view-item-img" alt="nike sneakers" />
        </div>
        <div className="view-item-info d-flex flex-column">
          <h4>{isLoading ? "Loading" : item.name} </h4>
          <div className="available-sizes  border-bottom border-primary mmt-4">
            <p className="my-2 ">Available sizes</p>
            <ul className="d-flex">
              {
                <SizeButtons
                  sizes={sizes}
                  choseSize={(size) => {
                    setSize(size);
                  }}
                />
              }
            </ul>
          </div>
          <button
            className="btn btn-primary my-4"
            onClick={(e) => {
              const itemArr = [];
              if (item) {
                itemArr.push(item);
                e.preventDefault();
                if (size === null) {
                  toggleModalHandler();
                } else {
                  dispatch(
                    cartActions.addItem({
                      itemId: item._id,
                      DB: itemArr,
                      chosenSize: size,
                    })
                  );

                  props.toggleCart();
                }
              }
            }}
          >
            Add to Cart
          </button>
          <div className="shipping-info border border-primary px-4 py-4">
            <div className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>{" "}
              <p className="my-0 ms-2">Free Delivery.</p>
            </div>
            <div className="d-flex align-items-center my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              <p className="my-0 ms-2">Free Returns.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default ItemViewer;
