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
        <p className="control">
          <label htmlFor={"name"}>Full Name</label>
          <input id={"name"} name={"name"} type="text" required></input>
        </p>
        <p className="control">
          <label htmlFor={"email"}>Email Address</label>
          <input
            id={"email"}
            name={"email"}
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
            <label htmlFor={"postal-code"}>Post Code</label>
            <input id={"postal-code"} name={"postal-code"} type="text" required />
          </p>
          <p className="control">
            <label htmlFor={"city"}>Town</label>
            <input id={"city"} name={"city"} required type="text" />
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
