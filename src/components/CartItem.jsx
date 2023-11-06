import { useContext } from "react";
import CartContext from "../store/CartContext";

import { priceFormatter } from "../util/priceFormatter";

export default function CartItem({ item }) {
  const cartCtx = useContext(CartContext);
  console.log("cartCtx", cartCtx);

  return (
    <li className="cart-item">
      <p>
        {item.name} {item.quantity} x {priceFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => cartCtx.addItem(item)}>+</button>
      </p>
    </li>
  );
}
