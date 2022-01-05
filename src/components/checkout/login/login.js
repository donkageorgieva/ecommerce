import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../utility/custom-form/custom-form";
import * as Yup from "yup";
import useSendRequest from "../../../hooks/http-hook";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user/user";

const Checkout = (props) => {
  const { sendRequest, items: userData, isLoading } = useSendRequest();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const usertoken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (data) => {
    sendRequest({
      url: "http://localhost:8080/auth/login",
      method: "POST",
      body: {
        email: data.email,
        password: data.password,
      },
      fn: (response) => {
        dispatch(
          userActions.login({
            userId: response.userId,
            token: response.token,
            email: data.email,
          })
        );
      },
    });

    navigate("/");
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
