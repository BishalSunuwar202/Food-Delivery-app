import React from "react";
import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food </h2>
      <p>
        CHoose your favourite meal from our broad selection of available meals
        and enjpoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked wiht high-qulaity ingredients, just in time and
        of course by exprienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
