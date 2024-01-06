// CartProvider.jsx
import React, { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
    }
  }, []);



  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
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
