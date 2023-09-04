import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
//import useForm from "../hooks/use-form";
import classes from "./Checkout.module.css";

//const isNotEmpty = (value: any) => value.trim() !== "";
//const isEmail = (value: any) => value.includes("@");
const isEmpty = (value: any) => value.trim() === "";
const isFiveChars = (value: any) => value.trim().length === 5;

const Checkout = (props: any) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  //these, I have used custom hook with useState

  // const {
  //   value: nameValue,
  //   isValid: nameIsValid,
  //   isError: nameHasError,
  //   enterValueHandler: nameChangeHandler,
  //   isTouchedHandler: nameBlurHandler,
  //   reset: resetName,
  // } = useForm(isNotEmpty);

  // const {
  //   value: emailValue,
  //   isValid: emailIsValid,
  //   isError: emailHasError,
  //   enterValueHandler: emailChangeHandler,
  //   isTouchedHandler: emailBlurHandler,
  //   reset: resetEmail,
  // } = useForm(isEmail);

  //here, I followed useRef where I will validate entered value afer submiting form
  const nameInputRef: any = useRef();
  const streetInputRef: any = useRef();
  const postalInputRef: any = useRef();
  const cityInputRef: any = useRef();

  // const formData = {
  //   name: nameValue,
  //   email: emailValue,
  // };

  // let formIsValid = false;

  // if (nameIsValid && emailIsValid) {
  //   formIsValid = true;
  // }

  // const submitHandler = (event: any) => {
  //   event.preventDefault();
  //   addUserHandler(formData);

  //   resetName();
  //   resetEmail();
  // };
  const submitHandler = (event: any) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    //submit card data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode, 
    });
  };

  // async function addUserHandler(formData: any) {
  //   const response = await fetch(
  //     "https://food-delivery-app-910eb-default-rtdb.firebaseio.com/User.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // }

  // const NameClasses = nameHasError ? "form-control invalid" : "form-control";
  // const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <Modal>
      {/* <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          /> */}
      {/* {nameHasError && (
            <p className="error-text">Please enter a first name.</p>
          )}
        </div> */}

      <form className={classes.form} onSubmit={submitHandler}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="name" id="name" ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please enter a valid name</p>}
        </div>

        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formInputsValidity.street && <p>Please enter a valid street</p>}
        </div>

        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalInputRef} />
          {!formInputsValidity.postalCode && (
            <p>Please enter a valid postal code(five character long)</p>
          )}
        </div>

        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputsValidity.city && <p>Please enter a city name</p>}
        </div>

        {/* <div className={classes.control}>
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
        </div> */}
        <div className={classes.control}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          {/* <button disabled={!formIsValid}>Confirm</button> */}
          <button>Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;
