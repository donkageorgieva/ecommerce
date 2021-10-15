import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="login-form  mt-4 ">
          <div className="my-2 ">
            <label className="form-label"> Email </label>

            <Field
              id="email"
              name="email"
              placeholder="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="span" className="error" />
          </div>
          <div className="my-2 ">
            <label className="form-label"> Password </label>

            <Field
              id="password"
              name="password"
              placeholder="password"
              className="form-control"
              type="password"
            />
            <ErrorMessage name="password" component="span" className="error" />
          </div>
          <button className="btn btn-primary my-2" type="submit">
            Log in
          </button>
          <p>
            Don't have an account? <Link to="/checkout/signUp">Sign up</Link>
          </p>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default Checkout;
