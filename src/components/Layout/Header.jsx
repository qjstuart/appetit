import { useContext } from "react";

import CartContext from "../../store/CartContext";
import logo from "../../assets/logo.jpg";
import Button from "../UI/Button";
import styles from "./Header.module.css";
import UserProgressContext from "../../store/UserProgressContext";

const Header = () => {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  // We want to go through all items in the items array and accumulate the total quantity.
  // The reducer method is perfect for this as it allows us to "reduce" an array down to one value.
  const totalCartItems = cartCtx.items.reduce(
    (accumulatedQuantity, currentItem) =>
      accumulatedQuantity + currentItem.quantity,
    0
  );

  function showCartHandler() {
    userProgressCtx.showCart();
  }

  return (
    <header id={styles["main-header"]}>
      <div id={styles.title}>
        <img src={logo} alt="ReactFood logo. Table laid for one." />
        <h1>Appétit</h1>
      </div>
      <Button textButton onClick={showCartHandler}>
        Cart ({totalCartItems})
      </Button>
    </header>
  );
};

export default Header;
