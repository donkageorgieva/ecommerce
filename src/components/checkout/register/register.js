import React from "react";
import CustomForm from "../../utility/custom-form/custom-form";
import * as Yup from "yup";
import useSendRequest from "../../../hooks/http-hook";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const CheckoutRegister = (props) => {
  const { sendRequest, items: userData } = useSendRequest();
  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const onSubmit = (data) => {
    sendRequest({
      url: "http://localhost:3002/auth",
      method: "POST",
      body: {
        email: data.email,
        password: data.password,
      },
      headers: {
        "Content-type": "application/json",
      },
    });
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
    <motion.div>
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
      <p>
        Already have an account? <Link to="/checkout/login">Log in</Link>
      </p>
    </motion.div>
  );
};

export default CheckoutRegister;
