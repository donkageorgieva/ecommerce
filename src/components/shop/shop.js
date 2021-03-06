/* eslint-disable no-fallthrough */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import Item from "./item/item";
import useSendRequest from "../../hooks/http-hook";
import "./shop.scss";
import { Modal } from "../utility/modal/modal";
import { animationVariantsS } from "../utility/animation-variants/animation-variants";

const Shop = (props) => {
  const { items: itemDB, sendRequest } = useSendRequest();
  const [toggleModal, setToggleModal] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  const [modalLink, setModalLink] = useState("");
  const [sneakers, setSneakers] = useState(null);

  const toggleStates = (state, setState) => {
    setState(!state);
  };
  const sortSneakers = (sortBy) => {
    switch (sortBy) {
      case "ASC":
        const sortedSneakersAsc = sneakers.sort((first, second) => {
          if (first === null || second === null) {
            return;
          }
          if (first.price < second.price) {
            return -1;
          } else {
            return 1;
          }
        });

        setSneakers(sortedSneakersAsc);
        break;
      case "DESC":
        const sortedSneakersDesc = sneakers.sort((first, second) => {
          if (first === null || second === null) {
            return;
          }
          if (first.price > second.price) {
            return -1;
          } else {
            return 1;
          }
        });

        setSneakers(sortedSneakersDesc);
        break;
      default:
        return;
    }
  };

  let items = sneakers ? (
    sneakers.map((item) => {
      if (item === null) {
        return;
      } else {
        return (
          <Item
            DB={itemDB}
            name={item.name}
            img={item.url}
            price={item.price}
            id={item._id}
            key={item._id}
            sizes={item.sizes}
            toggleCartHandler={props.toggleCartHandler}
            sizeError={(value) => {
              setToggleModal(value);
              setModalLink(item._id);
            }}
          />
        );
      }
    })
  ) : (
    <h1> Loading ... </h1>
  );
  useEffect(() => {
    sendRequest({
      url: "https://ecom-api-nodejs.herokuapp.com/items/sneakers",
      fn: (data) => {
        setSneakers(data);
      },
    });
  }, [sendRequest]);

  return (
    <motion.div
      variants={animationVariantsS}
      initial="hidden"
      animate="visible"
      exit="exit"
      name="shop"
      className="py-5"
    >
      {toggleModal
        ? ReactDOM.createPortal(
            <Modal
              title="Invalid size"
              body="Do you want to choose a size now?"
              positiveAction="Ok"
              negativeAction="Cancel"
              negativeActionFnc={() => {
                toggleStates(toggleModal, setToggleModal);
              }}
              link={modalLink}
              linkToItem={true}
            />,
            document.getElementById("modal")
          )
        : null}
      <div
        className="dropdown"
        onClick={() => {
          toggleStates(showDropdown, setShowDropDown);
        }}
      >
        <button
          className="btn btn-secondary dropdown-toggle shadow-none"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort
        </button>
        <ul className={showDropdown ? "dropdown-menu show" : "dropdown-menu"}>
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                sortSneakers("DESC");
              }}
            >
              Price High to Low
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                sortSneakers("ASC");
              }}
            >
              Price Low to High
            </a>
          </li>
        </ul>
      </div>
      <div
        className={
          "d-flex flex-wrap justify-content-start py-5 align-items-center"
        }
      >
        <ul className="card-group justify-content-start">{items}</ul>
      </div>
    </motion.div>
  );
};

export default Shop;
