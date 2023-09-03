import React, { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

//this will render the meal list and here, another component MealItem is added for more clear react structure

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  //in this case, loading can be true

  const fetchMealsHandler = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      "https://food-delivery-app-910eb-default-rtdb.firebaseio.com/Meals.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();

    //as data is object, we need to change them in array
    const loadedMeals: any = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }

    setMeals(loadedMeals);
    setLoading(false);
  }, []);

  //we are using useEffect to directly render the meals
  useEffect(() => {
    fetchMealsHandler().catch((error: any) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, [fetchMealsHandler]);
  // const mealList = meals.map((meal) => (
  //   <li>
  //     <MealItem
  //       key={meal.id}
  //       id={meal.id}
  //       name={meal.name}
  //       description={meal.description}
  //       price={meal.price}
  //     />
  //   </li>
  // ));

  if (loading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Hard Loading hae ta....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  console.log(meals);
  const mealList = meals.map((meal: any) => (
    //<li> this li is causing error in console
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
    //</li>
  ));

  return (
    <>
      {/* <div>{loading && <h1 style={{color: "green"}}>loading......</h1>}</div> */}

      <section className={classes.meals}>
        <Card>
          <ul>{mealList}</ul>
          {/* <ul>{meals}</ul> */}
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;
