import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
//we are using useRef to extract the amount, alternative can be two way binding using useState
// as Input is the custom component, ref={} will not work, to use this ref, we should go
// go the component where we wanna receive ref, in this case, go to UI/Input.js

const MealItemForm = (props: any) => {
  const [amountIsValid, setAmoutIsValid] = useState(true);
  const amountInputRef: any = useRef();

  const submitHandler = (event: any) => {
    event.preventDefault();
    //here, amountInputRef.current will always point to the <Input> element ref={amountInputRef}. it gets
    //the current value stored in ref of <Input > below
    const enteredAmount = amountInputRef.current.value; //this holds currently entered value and is always string
    const enteredAmountNumber = +enteredAmount; // + change string to number

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmoutIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button> + Add </button>
      {!amountIsValid && <p>Please Enter A Valid Amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
