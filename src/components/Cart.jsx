import CartContext from "../store/CartContext";
import { useContext } from "react";

import Modal from "./UI/Modal";
import { priceFormatter } from "../util/priceFormatter";
// import styles from "./Cart.module.css";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotalPrice = cartCtx.items.reduce(
    (accumulatedPrice, currentItem) =>
      accumulatedPrice + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          );
        })}
      </ul>
      <p className="cart-total">
        {priceFormatter.format(cartTotalPrice)}
      </p>
      <p className="modal-actions">
        <Button textButton>Close</Button>
        <Button>To Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
