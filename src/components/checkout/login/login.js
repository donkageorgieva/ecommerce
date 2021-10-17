import React from "react";

import { Link } from "react-router-dom";

import CustomForm from "../../utility/custom-form/custom-form";
import * as Yup from "yup";
const Checkout = (props) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is a required field"),
    password: Yup.string()
      .min(8)
      .max(255)
      .required("Password is a required field"),
  });
  return (
    <React.Fragment>
      <h1 className="my-4 pt-4"> Log in </h1>
      <CustomForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        fields={[
          {
            id: "email",
            name: "email",
            placeholder: "Email",
            type: "email",
            label: "Email",
          },
          {
            id: "password",
            name: "password",
            placeholder: "Password",
            type: "password",
            label: "Password",
          },
        ]}
        btnText="Log in"
      >
        <p>
          Don't have an account? <Link to="/checkout/signUp">Sign up</Link>
        </p>
      </CustomForm>
    </React.Fragment>
  );
};

export default Checkout;
