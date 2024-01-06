import React, { useContext, useState } from "react";
import { CartContext } from "../Providers/CartProvider";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function CartCard() {
  const { user, updateUser } = useContext(CartContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const deleteProduct = async (product) => {
    const cart = user.cart.filter((pro) => pro._id !== product._id);
    user.total = user.total - product.price * product.quantity;

    const upUser = { ...user, cart };
    await axios.put(`http://localhost:5001/api/user/${user._id}`, { user });

    updateUser(upUser);
  };

  const payment = async () => {
    try {
      if (user.balance - user.total < 0) {
        setErrorMessage("Balance is less than 0. Payment cannot be completed.");
        return;
      }

      user.balance -= user.total;
      user.total = 0;
      user.orders.push([...user.cart]);
      user.cart = [];
      await axios.put(`http://localhost:5001/api/user/${user._id}`, { user });
      updateUser(user);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
        <div className="w-full flex flex-col h-fit gap-4 p-4 ">
          <p className="text-blue-900 text-xl font-extrabold">My cart</p>

          <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
            {user &&
              user.cart &&
              user.cart.map((cartItem, id) => (
                <div
                  key={id}
                  className="flex flex-col md:flex-row gap-3 justify-between"
                >
                  <div
                    onClick={() => deleteProduct(cartItem)}
                    className="xmark"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </div>
                  <div className="flex flex-row gap-6 items-center">
                    <div className="w-28 h-28">
                      <img className="w-full h-full" src={cartItem.image} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-lg text-gray-800 font-semibold">
                        {" "}
                        {cartItem.name}{" "}
                      </p>
                      <p className="text-xs text-gray-600 font-semibold">
                        Quantities:{" "}
                        <span className="font-normal">
                          {" "}
                          {cartItem.quantity}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="self-center text-center">
                    <p className="text-gray-800 font-normal text-xl">
                      {" "}
                      {cartItem.quantity * cartItem.price}₺
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
          <p className="text-blue-900 text-xl font-extrabold">
            Purchase Resume
          </p>
          <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            <hr className="bg-gray-200 h-0.5" />
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">Total</p>
              <div>
                <p className="text-end font-bold">
                  {" "}
                  {user && user.total && user.total} ₺
                </p>
              </div>
            </div>
            <div className="flex w-1/2 m-auto gap-2">
              <button
                onClick={payment}
                className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md"
              >
                FINISH
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
