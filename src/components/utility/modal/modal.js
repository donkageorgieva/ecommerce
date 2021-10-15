import React from "react";
import { Link } from "react-router-dom";
import "./modal.scss";
export const Modal = (props) => {
  return (
    <React.Fragment>
      <div className="warning-modal px-4 py-4">
        <div className="d-flex justify-content-end">
          <button className="close-btn" onClick={props.negativeActionFnc}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
        <div className="text-align-center content py-4">
          <h5> {props.title}</h5>
          <p> {props.body} </p>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={props.negativeActionFnc}
          >
            {props.negativeAction}
          </button>
          {props.linkToItem ? (
            <Link
              className="btn btn-primary"
              to={["/shop/view", props.link].join(" ")}
            >
              {props.positiveAction}
            </Link>
          ) : (
            <button
              className="btn btn-primary"
              onClick={props.negativeActionFnc}
            >
              {" "}
              {props.positiveAction}
            </button>
          )}
        </div>
      </div>

      <div className="backdrop" onClick={props.negativeActionFnc} />
    </React.Fragment>
  );
};

export default Modal;
