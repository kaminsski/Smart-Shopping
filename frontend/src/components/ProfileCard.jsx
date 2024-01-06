import React, { useContext } from "react";
import { CartContext } from "../Providers/CartProvider";

export default function ProfileCard() {
  const { user } = useContext(CartContext);
  console.log(user && user.orders)
  return (
    <>
      <div>
        <div className="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl">
          <div className="md:col-span-1 h-48 shadow-xl ">
            <div className="flex w-full h-full relative">
              <img
                src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
                className="w-44 h-44 m-auto"
                alt=""
              />
            </div>
          </div>
          <div className="md:col-span-3 h-48 shadow-xl  space-y-2 p-3">
            <div className="flex ">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Name:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.username : ''}
                readOnly
              />
            </div>
            <div className="flex ">
              <span className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Email:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.email : ''}
                readOnly
              />
            </div>
            <div className="flex ">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Balance:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.balance+"₺" : ''}
                readOnly
              />
            </div>
            
          </div>
          <div className="md:col-span-3 h-48 shadow-xl p-4 space-y-2 hidden md:block">
            <h3 className="font-bold uppercase"> Past Orders</h3>
            <div className="">
            {user &&
  user.orders.map((order, orderId) => (
    <div key={orderId}>

      <div className="bg-red-400 my-3">
        <h3>Order {orderId}</h3>
        {order.map((product, productId) => (
          <div key={productId}>
            <h1>{product.name}</h1>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  ))}
   
  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
