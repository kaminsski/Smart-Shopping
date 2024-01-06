// CartProvider.jsx
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [up, setUp] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("get");
    }
  }, [up]);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUp(!up)

  };



  const value = {
    setUser,
    setProducts,
    products,
    user,
    updateUser,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
