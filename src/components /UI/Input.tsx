import React from "react";
import classes from "./Input.module.css";

//forwardRef is used to apply ref in custom component

const Input = React.forwardRef((props: any, ref: any) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
