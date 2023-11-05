import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState("");
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  }

  function showCart() {
    setUserProgress("cart");
  };

  function hideCart() {
    setUserProgress("");
  };

  function showCheckout() {
    setUserProgress("checkout");
  };

  function hideCheckout() {
    setUserProgress("");
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
  );
};

export default UserProgressContext;
