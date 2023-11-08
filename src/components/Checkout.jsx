import { useContext } from "react";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import { priceFormatter } from "../util/priceFormatter";
import Button from "./UI/Button";
import Input from "./UI/Input";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotalPrice = cartCtx.items.reduce(
    (accumulatedPrice, currentItem) =>
      accumulatedPrice + currentItem.price * currentItem.quantity,
    0
  );

  function hideCheckoutHandler() {
    userProgressCtx.hideCheckout();
  }

  async function submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const extractedFormData = Object.fromEntries(formData.entries());
    console.log(extractedFormData);

    // send POST to dummy backend /orders
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: extractedFormData,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Error submitting order: Response not OK (${response.status})`
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={hideCheckoutHandler}
    >
      <form onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total Amount: {priceFormatter.format(cartTotalPrice)}</p>

        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input
            label="Post Code"
            id="postal-code"
            name="postal-code"
            type="text"
          />
          <Input label="City" id="city" name="city" type="text" />
        </div>

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
