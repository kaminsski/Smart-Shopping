import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Providers/CartProvider";
import axios from "axios";
export default function Counter({ productId }) {
  const { products, user, updateUser, setUser } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);


  useEffect(() => {
    // Her render sonrasında user.cart içindeki productId'ye göre quantity değerini güncelle
    const cartItem = user.cart.find((item) => item._id === productId);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [user.cart]);


  const increaseQuantity = async (id) => {
    try {
      const newProduct = products.find((product) => product._id === id);
      const existingProductIndex = user.cart.findIndex((pro) => pro._id === newProduct._id);
      if (existingProductIndex !== -1){
        user.cart[existingProductIndex].quantity += 1;

      }else{
        user.cart.push({ ...newProduct, quantity: 1 });
      }
      user.total += newProduct.price
      await axios.put(`http://localhost:5001/api/user/${user._id}`, { user });
      setQuantity(quantity+1)
      updateUser(user)
    } catch (error) {
      console.log(error)
    }
  }
      

     

  const reduceQuantity = async(id) => {
    try {
      const newProduct = products.find((product) => product._id === id);

      const existingProductIndex = user.cart.findIndex((pro) => pro._id === id);
      if (existingProductIndex !== -1) {
          if (user.cart[existingProductIndex].quantity > 1) {
              user.cart[existingProductIndex].quantity -= 1;
          } else {
              // Eğer ürün miktarı 1 ise, ürünü sepette tamamen kaldır
              user.cart.splice(existingProductIndex, 1);
          }
          user.total -= newProduct.price
          await axios.put(`http://localhost:5001/api/user/${user._id}`, { user });
          setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
          updateUser(user);
      }
  } catch (error) {
      console.log(error);
  }
};



  return (
    <>
      <div className="counter flex bg-blue-400 w-1/3 justify-center m-auto">
        <div onClick={()=>reduceQuantity(productId)} className="left px-3">
          <i className="fa-solid fa-minus"></i>
        </div>
        <div className="middle">
          <input
            style={{ width: "30px" }}
            className="px-2"
            type="text"
            value={quantity}
            readOnly
          />
        </div>
        <div onClick={() => increaseQuantity(productId)} className="right px-3">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </>
  );
}
