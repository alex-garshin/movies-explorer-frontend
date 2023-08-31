import { useState, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";

import CurrentUserContext from "../context/CurrentUserContext";
import {
  emailValidationError,
  nameValidationError,
  passwordValidationError,
  regExName,
  regExPassword,
} from "../utils/constants";

const useForm = () => {
  const [enteredValues, setEnteredValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      if (!isEmail(value)) {
        e.target.setCustomValidity(emailValidationError);
      } else {
        e.target.setCustomValidity("");
      }
    }

    if (name === "name" && location.pathname === "/sign-up") {
      if (!value.match(regExName)) {
        e.target.setCustomValidity(nameValidationError);
      } else {
        e.target.setCustomValidity("");
      }
    }
    if (name === "password" && location.pathname === "/sign-up") {
      if (!value.match(regExPassword)) {
        e.target.setCustomValidity(passwordValidationError);
      } else {
        e.target.setCustomValidity("");
      }
    }

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: e.target.validationMessage,
    });

    if (value !== currentUser.name && value !== currentUser.email) {
      setIsFormValid(e.target.closest(".form").checkValidity());
    } else {
      setIsFormValid(false);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid]
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isFormValid,
    resetForm,
  };
};

export default useForm;
