import { useContext } from "react";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import { priceFormatter } from "../util/priceFormatter";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotalPrice = cartCtx.items.reduce(
    (accumulatedPrice, currentItem) =>
      accumulatedPrice + currentItem.price * currentItem.quantity,
    0
  );

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {priceFormatter.format(cartTotalPrice)}</p>
        <p className="control">
          <label htmlFor={"full-name"}>Full Name</label>
          <input
            id={"full-name"}
            name={"full-name"}
            type="text"
            required
          ></input>
        </p>
        <p className="control">
          <label htmlFor={"email-address"}>Email Address</label>
          <input
            id={"email-address"}
            name={"email-address"}
            type="email"
            required
          ></input>
        </p>
        <p className="control">
          <label htmlFor={"street"}>Street</label>
          <input id={"street"} name={"street"} type="text" required></input>
        </p>
        <div className="control-row">
          <p className="control">
            <label htmlFor={"post-code"}>Post Code</label>
            <input id={"post-code"} name={"post-code"} type="text" required />
          </p>
          <p className="control">
            <label htmlFor={"town"}>Town</label>
            <input id={"town"} name={"town"} required type="text" />
          </p>
        </div>

        <p className="modal-actions">
          <Button
            type="button"
            textButton
            onClick={userProgressCtx.hideCheckout}
          >
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
