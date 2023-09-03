import React, { useState } from "react";

const useForm = (validation: any) => {
  const [enterValue, setEnterValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enterValueIsValid = validation(enterValue);
  const isError = !enterValueIsValid && isTouched;

  const enterValueHandler = (event: any) => {
    setEnterValue(event.target.value);
  };

  const isTouchedHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnterValue("");
    setIsTouched(false);
  };

  return {
    value: enterValue,
    isValid: enterValueIsValid,
    isError,
    enterValueHandler,
    isTouchedHandler,
    reset
  };
};

export default useForm;
