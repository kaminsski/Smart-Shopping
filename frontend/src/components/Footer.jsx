import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
     

<footer className="bg-white shadow dark:bg-gray-900">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/">
            <div className="logo-container">
              <img
                className="w-32 rounded-xl"
                src="/images/logo2.jpeg"
                alt="Logo"
              />
            </div>
          </Link>                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Smart Shopping</span>
           
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/" className="hover:underline me-4 md:me-6">Home</Link>
                </li>
                <li>
                    <Link to="/profile" className="hover:underline me-4 md:me-6">Profile</Link>
                </li>
                <li>
                    <a href="/cart" className="hover:underline me-4 md:me-6">Cart</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://github.com/kaminsski" className="hover:underline">Kanat™</a> All Rights Reserved.</span>
    </div>
</footer>

 
    </>
  )
}
