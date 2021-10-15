import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CheckoutRegister = (props) => {
  return (
    <React.Fragment>
      <h1 className="my-4 pt-4"> Sign up </h1>
      <Formik>
        <Form className="login-form  mt-4 ">
          <div className="my-2 ">
            <label className="form-label"> Email </label>
            <Field
              id="email"
              name="email"
              placeholder="email"
              className="form-control"
            />
          </div>
          <div className="my-2 ">
            <label className="form-label"> Password </label>
            <Field
              id="password"
              name="password"
              placeholder="password"
              className="form-control"
            />
          </div>
          <div className="my-2 ">
            <label className="form-label"> Password </label>
            <Field
              id="passwordRepeat"
              name="passwordRepeat"
              placeholder="repeatpassword"
              className="form-control"
            />
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

export default CheckoutRegister;
