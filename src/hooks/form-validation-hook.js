import React from "react";
import { useState } from "react";

const useFormValidation = () => {
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validForm, isFormValid] = useState(false);
};

export default useFormValidation;
