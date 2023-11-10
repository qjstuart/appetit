// import { useEffect, useState } from "react";

import Meal from "./Meal";
import Error from "./Error";
import useHttp from "../hooks/useHttp";
import styles from "./Meals.module.css";

const config = {};

export default function Meals() {
  // const [meals, setMeals] = useState(null);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     try {
  //       const response = await fetch("http://localhost:3000/meals");
  //       if (!response.ok) {
  //         throw new Error(
  //           `Error fetching meals: Response not OK (${response.status})`
  //         );
  //       }
  //       const meals = await response.json();
  //       setMeals(meals);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  //   fetchMeals();
  // }, []);

  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);

  if (isLoading) {
    return <p className="center">Loading meals...</p>;
  }

  if (error) {
    return <Error title={"Failed to fetch meals"} message={error} />
  }

  return (
    // <div id="meals">{meals && meals.map((meal) => <li>{meal.name}</li>)}</div>
    <ul id={styles.meals}>
      {meals && meals.map((meal) => <Meal key={meal.id} meal={meal} />)}
    </ul>
  );
}
