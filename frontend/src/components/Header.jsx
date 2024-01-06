import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../Providers/CartProvider'

export default function Header() {
  const navigate = useNavigate()
  const {setUser,updateUser,user} = useContext(CartContext)


  const logout = () =>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate("/login")
  }

  return (
    <div className='flex justify-between  items-center bg-purple-500 p-5'>
      {user ? <>
      <Link to="/"><div className="logo-container">
      <img className='w-32 rounded-xl' src="/images/logo2.jpeg" alt="Logo" />
  </div></Link>
  <div className="linkContainer">
      <ul className='flex gap-10 text-white text-2xl font-bold'>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/cart">Cart</Link></li>
      </ul>
  </div>
  <div className="cartContainer bg-white p-3 rounded-xl">
  <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i>
  {user.total}
  </Link>
  
  </div>
  <span onClick={logout} className='text-white text-2xl font-bold'>Logout</span>
  </>
      :
      <>
      <Link to="/"><div className="logo-container">
      <img className='w-32 rounded-xl' src="/images/logo2.jpeg" alt="Logo" />
  </div></Link>
  <div className="linkContainer">
      <ul className='flex gap-10 text-white text-2xl font-bold'>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/cart">Cart</Link></li>
      </ul>
  </div>
  <div className="cartContainer bg-white p-3 rounded-xl">
  <Link to="/register"><i className="fa-solid fa-user"></i></Link>
  </div></>}
        
    </div>
  )
}
