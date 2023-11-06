import CartContext from "../store/CartContext";
import { useContext } from "react";

import CartItem from "./CartItem";
import Modal from "./UI/Modal";
import { priceFormatter } from "../util/priceFormatter";

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

  function hideCartHandler() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">{priceFormatter.format(cartTotalPrice)}</p>
      <p className="modal-actions">
        <Button textButton onClick={hideCartHandler}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={hideCartHandler}>To Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
