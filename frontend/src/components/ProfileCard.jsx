import React, { useContext } from "react";
import { CartContext } from "../Providers/CartProvider";

export default function ProfileCard() {
  const { user } = useContext(CartContext);

  return (
    <>
    
      <div >
        <div className="bg-gray-100">
          <div className="cardTop flex flex-wrap  items-center sm:flex justify-center">
          <div className="w-2/3 md:w-1/3 h-48 shadow-xl">
            <div className="flex w-full h-full relative">
              <img
                src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
                className="w-44 h-44 m-auto"
                alt=""
              />
            </div>
          </div>
          <div className="md:col-span-3 h-48 shadow-xl space-y-2 p-3">
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Name:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.username : ""}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Email:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.email : ""}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Balance:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={user ? user.balance + "₺" : ""}
                readOnly
              />
            </div>
            </div>
          </div>
          <div className="md:col-span-3 p-4 block">
            <h3 className="font-bold uppercase text-center text-2xl"> Past Orders</h3>
            <div className="sm:w-1/2 w-full flex flex-col justify-center m-auto">
              {user &&
                user.orders.map((order, orderId) => (
                  <div key={orderId} className="bg-sky-950 my-3 p-4 rounded-md">
                    <h3 className="text-white text-lg font-bold mb-2">Order {orderId}</h3>
                    {order.map((product, productId) => (
                      <div key={productId} className="border-b border-gray-200 py-2">
                        <h1 className="text-xl text-white font-bold">{product.name}</h1>
                        <p className="text-white">Price: {product.price}₺</p>
                        <p className="text-white">Quantity: {product.quantity}</p>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
