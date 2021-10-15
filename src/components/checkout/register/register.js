import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomForm from "../../utility/custom-form/custom-form";
import * as Yup from "yup";
const CheckoutRegister = (props) => {
  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
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
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match!")
      .required("Please confirm your password"),
  });
  return (
    <React.Fragment>
      <h1 className="my-4 pt-4"> Sign up </h1>
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
          {
            id: "passwordConfirm",
            name: "passwordConfirm",
            placeholder: "Confirm Password",
            type: "password",
            label: "Confirm Password",
          },
        ]}
        btnText="Sign up"
      />
    </React.Fragment>
  );
};

export default CheckoutRegister;
