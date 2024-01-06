import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../Providers/CartProvider'

export default function LoginComponent() {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")

  const navigate = useNavigate();
  
  const { user, updateUser } = useContext(CartContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        {
          username,
          password,
        },
        config
      );

      localStorage.setItem("jwt", response.data.token);
      updateUser(response.data.user);

      navigate("/");
    } catch (error) {
      console.error("hata", error);
    }
  };


  return (
    <>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden w-full md:w-1/2 flex bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center p-20">
          <div className="flex flex-col gap-10">
            <h1 className="text-white font-bold text-4xl font-sans">
              Create an account
            </h1>
            
            <Link
              style={{ backgroundColor:"white", padding:"7px", fontSize:"25px", fontWeight:"bolder", color:"black", width:"120px", textAlign:"center", borderRadius:"30px"}}
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form onSubmit={handleRegister} className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome</p>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e)=>{setUsername(event.target.value)}}
                value={username}
              />
            </div>
            
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e)=>{setPassword(event.target.value)}}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
