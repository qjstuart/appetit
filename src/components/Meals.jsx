import { useEffect, useState } from "react";

export default function Meals() {
  const [meals, setMeals] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error(
            `Error fetching meals: Response not OK (${response.status})`
          );
        }
        const meals = await response.json();
        setMeals(meals);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMeals();
  }, []);

  return (
    <div id="meals">{meals && meals.map((meal) => <li>{meal.name}</li>)}</div>
  );
}
