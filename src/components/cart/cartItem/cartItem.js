import "./cartItem.scss";
import styles from "./cartitem.module.scss";

const CartItem = (props) => {
  return (
    <li className="cartItem d-flex justify-content-between shadow-sm my-2 ">
      <div className="itemInfo d-flex align-items-center ms-3 me-2">
        <div
          style={{ height: "10em" }}
          className="d-flex flex-column align-items-start justify-content-center"
        >
          <p className=" my-1">{props.name}</p>
          <div className={styles.imgContainer}>
            <img src={props.img} alt={props.img} />
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button
          className="cart-btn"
          style={{ fontWeight: "900" }}
          onClick={() => {
            props.addMore();
          }}
        >
          +
        </button>

        <span> {props.amountInCart} </span>
        <button
          className="cart-btn"
          style={{ fontWeight: "900" }}
          onClick={() => {
            props.removeItems();
          }}
        >
          -
        </button>
      </div>
      <div className=" d-flex justify-content-evenly align-items-center cartOptions mx-0 px-0 ">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ height: "8em" }}
        >
          <div className="d-flex align-items-evenly justify-content-center ">
            <div className="d-flex flex-column  align-items-center justify-content0-center ">
              <p style={{ fontWeight: "900" }}> $ {props.price}</p>

              <p>Size: {props.size}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn p-0 m-0 close"
        onClick={() => {
          props.removeAllItems();
        }}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-2"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>{" "}
      </button>
    </li>
  );
};

export default CartItem;
