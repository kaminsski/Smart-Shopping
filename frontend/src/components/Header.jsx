import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Providers/CartProvider";

export default function Header() {
  const navigate = useNavigate();
  const { setUser, updateUser, user } = useContext(CartContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    return(window.location.href="/login")
  };




  return (
    <div className="flex justify-between items-center bg- p-5 bg-gray-900">
      {user ? (
        <>
          <Link to="/">
            <div className="logo-container">
              <img
                className="w-32 rounded-xl"
                src="/images/logo2.jpeg"
                alt="Logo"
              />
            </div>
          </Link>

          <div className="rightNav flex items-center text-lg bg-white rounded-lg">
            <div
              onClick={()=>{setDropdownVisible(!dropdownVisible)}}
            
              className="relative"
            >
              <span className="bg-white p-3 rounded-xl cursor-pointer">
                <i className="fa-solid fa-user"></i>
              </span>
              {dropdownVisible && (
                <div className="absolute dropdown bg-white border-2 border-black z-10 right-0 top-10 rounded-lg p-2">
                  <Link to="/profile">
                    <span className=" text-black text-xl font-bold  border-black flex items-center gap-2">
                    <i className="fa-regular fa-address-card"></i>Profile
                    </span>
                  </Link>
                  <span
                    onClick={logout}
                    className="text-black text-xl font-bold flex items-center gap-2"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>Logout
                  </span>

                  {user.role === "admin" && ( // Eğer user'ın rolü admin ise admin linkini göster
            <Link to="/admin">
              <span className="text-black text-xl font-bold border-black flex items-center gap-2">
                <i className="fa-regular fa-address-card"></i>Admin
              </span>
            </Link>
          )}

                </div>
              )}
            </div>
            <span className="text-5xl text-black mb-2">|</span>
            <div className="cartContainer bg-white p-3 rounded-xl">
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
                {user.total}₺
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/">
            <div className="logo-container">
              <img
                className="w-32 rounded-xl"
                src="/images/logo2.jpeg"
                alt="Logo"
              />
            </div>
          </Link>
          <div className="linkContainer">
            
          </div>
          <div className="cartContainer bg-white p-3 rounded-xl">
            <Link to="/register">
              <i className="fa-solid fa-user"></i>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
