import React from "react";
import Modal from "../UI/Modal";
import useForm from "../hooks/use-form";
import classes from "./Checkout.module.css";

const isNotEmpty = (value: any) => value.trim() !== "";
const isEmail = (value: any) => value.includes("@");

const Checkout = () => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    isError: nameHasError,
    enterValueHandler: nameChangeHandler,
    isTouchedHandler: nameBlurHandler,
    reset: resetName,
  } = useForm(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    isError: emailHasError,
    enterValueHandler: emailChangeHandler,
    isTouchedHandler: emailBlurHandler,
    reset: resetEmail,
  } = useForm(isEmail);

  const formData = {
    name: nameValue,
    email: emailValue,
  };

  let formIsValid = false;

  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event: any) => {
    event.preventDefault();
    addUserHandler(formData);

    resetName();
    resetEmail();
  };

  async function addUserHandler(formData: any) {
    const response = await fetch(
      "https://food-delivery-app-910eb-default-rtdb.firebaseio.com/User.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const NameClasses = nameHasError ? "form-control invalid" : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  return (
    <Modal>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className="error-text">Please enter a first name.</p>
          )}
        </div>

        <div className={classes.control}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" />
        </div>

        <div className={classes.control}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" />
        </div>

        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" />
        </div>

        <div className={emailClasses}>
          <label htmlFor="email"> Your Email</label>
          <input
            type="text"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className="error-text">Please enter a valid email address.</p>
          )}
        </div>

        <button disabled={!formIsValid}>Confirm</button>
      </form>
    </Modal>
  );
};

export default Checkout;
