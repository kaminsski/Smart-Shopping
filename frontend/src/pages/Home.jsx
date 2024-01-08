import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import Products from '../components/Products'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
    <div className="bg-gray-100">
      <Slider></Slider>
      <Products></Products>
      </div>
    </>
  )
}
