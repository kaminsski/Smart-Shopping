import React from "react";
import Counter from "./Counter";

export default function ProductItem({ product }) {
  return (
    <div className="cartContainer">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg"
            src={product.image}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             {product.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.price} ₺
          </p>
         
       <Counter productId={product._id}></Counter>

        </div>
      </div>
    </div>
  );
}
