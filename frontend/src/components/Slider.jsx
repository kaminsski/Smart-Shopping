import React, { useState, useEffect } from "react";

export default function Slider() {
  const [img, setImg] = useState("1");

  const goLeft = () => setImg(img !== "1" ? "1" : "2");

  const goRight = () => setImg(img !== "2" ? "2" : "1");

  useEffect(() => {
    const interval = setInterval(goRight, 5000);

    return () => clearInterval(interval);
  }, [img]); 


  return (
    <div className="relative flex flex-col items-center">
      <img
        className="w-full h-96 ease-in duration-500 object-cover"
        src={`/images/s${img}.jpg`}
        alt=""
      />
      <div className="flex absolute top-1/3 w-full justify-between">
        <span
          onClick={goLeft}
          className="m-3 p-3 bg-white rounded-full bg-opacity-60 transition-transform transform hover:scale-110"
        >
          <i className="fa-solid fa-arrow-left font-extrabold lg:text-5xl text-2xl"></i>
        </span>
        <span
          onClick={goRight}
          className="m-3 p-3 bg-white rounded-full bg-opacity-60 transition-transform transform hover:scale-110"
        >
          <i className="fa-solid fa-arrow-right font-extrabold lg:text-5xl text-2xl"></i>
        </span>
      </div>
    </div>
  );
}
