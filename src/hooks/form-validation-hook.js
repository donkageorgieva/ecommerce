import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const useForm = (initialValues, onSubmit, validationSchema) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    ></Formik>
  );
};

export default useForm;
