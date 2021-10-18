import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomForm from "../../utility/custom-form/custom-form";
import * as Yup from "yup";
import useSendRequest from "../../../hooks/http-hook";
import { motion } from "framer-motion";
const Checkout = (props) => {
  const { sendRequest, items: userData } = useSendRequest();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (data) => {
    sendRequest({
      url: "http://localhost:3002/auth/login",
      method: "POST",
      body: {
        email: data.email,
        password: data.password,
      },
    });
    console.log(userData);
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
    <motion.div>
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
    </motion.div>
  );
};

export default Checkout;
