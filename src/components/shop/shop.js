import react from "react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Item from "./item/item";
import useSendRequest from "../../hooks/http-hook";
import "./shop.scss";
import styles from "./shop.module.scss";
import { useState } from "react/cjs/react.development";
import { Modal } from "../utility/modal/modal";
const Shop = (props) => {
  const { isLoading, error, items: itemDB, sendRequest } = useSendRequest();

  const [toggleModal, setToggleModal] = useState(false);
  const [modalLink, setModalLink] = useState("");
  const toggleModalHandler = () => {
    const isModalShown = toggleModal;
    setToggleModal(!isModalShown);
  };
  const items = itemDB.map((item) => {
    if (item === null) {
      return;
    } else {
      return (
        <Item
          name={item.name}
          img={item.url}
          price={item.price}
          id={item.id}
          key={item.id}
          sizes={item.sizes}
          toggleCartHandler={props.toggleCartHandler}
          sizeError={(value) => {
            setToggleModal(value);
            setModalLink(item.id);
          }}
        />
      );
    }
  });

  useEffect(() => {
    sendRequest({
      url: "https://sneakers-65e0b-default-rtdb.firebaseio.com/items.json",
    });
  }, [sendRequest]);

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
              link={modalLink}
              linkToItem={true}
            />,
            document.getElementById("modal")
          )
        : null}
      <section
        className={[
          styles.shopSection,
          "d-flex flex-wrap justify-content-start py-5 align-items-center",
        ].join(" ")}
      >
        <ul className="card-group justify-content-center">{items}</ul>
      </section>
    </React.Fragment>
  );
};

export default Shop;
