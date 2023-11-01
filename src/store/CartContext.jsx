import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: () => {},
});

// code to actually manage our state
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM_TO_CART") {
    const existingItemIndex = state.items.findIndex((item) => {
      item.id === action.item.id;
    });

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
      // Item does not exist
      updatedItems.push(action.item);
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_ITEM_FROM_CART") {
    const existingItemIndex = state.items.findIndex((item) => {
      item.id === action.id;
    });

    // We will be replacing the items array with updatedItems
    // to keep the current state immutable
    const updatedItems = [...state.items];
    const existingItem = state.items[existingItemIndex];

    if (existingItem.quantity === 1) {
      updatedItems.filter((item) => {
        item.id !== action.id;
      });
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  } else {
    throw Error("Unknown action: " + action.type);
  }
}

export function CartContextProvider({ children }) {
  useReducer(cartReducer, { items: [] });

  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;
