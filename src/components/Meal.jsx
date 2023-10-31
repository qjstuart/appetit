import { priceFormatter } from "../util/priceFormatter";
import Button from "./UI/Button";
import styles from "./Meal.module.css";

export default function Meal({ meal }) {
  return (
    <li className={styles["meal-item"]}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className={styles["meal-item-price"]}>
            {priceFormatter.format(meal.price)}
          </p>
          <p className={styles["meal-item-description"]}>{meal.description}</p>
        </div>
        <p className={styles["meal-item-actions"]}>
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
