import React, { Fragment } from "react";
import meals from "../../assests/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const header = (props: any) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>

      <div className={classes["main-image"]}>
        <img src={meals} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default header;
