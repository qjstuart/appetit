import { createContext, useReducer } from "react";

// Create the context we wish to provide to the rest of the app.
// We enter the intitial/default context which is received when the app starts.
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: () => {},
});

// code to actually manage our state
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM_TO_CART") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // We will be replacing the items array with updatedItems
    const updatedItems = [...state.items];
    if (existingItemIndex > -1) {
      // Item exists
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      // Item does not exist, create a new item
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_ITEM_FROM_CART") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // We will be replacing the items array with updatedItems
    // to keep the current state immutable
    const updatedItems = [...state.items];
    const existingItem = state.items[existingItemIndex];

    console.log("state.items: ", state.items);
    console.log("existingItem: ", existingItem);

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }

    // if (existingItem.quantity === 1) {
    //   updatedItems.filter((item) => {
    //     item.id !== action.id;
    //   });
    // } else {
    //   const updatedItem = {
    //     ...existingItem,
    //     quantity: existingItem.quantity - 1,
    //   };
    //   updatedItems[existingItemIndex] = updatedItem;
    // }

    return {
      ...state,
      items: updatedItems,
    };
  } else {
    throw Error("Unknown action: " + action.type);
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  const cartCtx = { items: cart.items, addItem, removeItem };

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM_TO_CART", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM_FROM_CART", id });
  }

  console.log(cartCtx);

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}

export default CartContext;
