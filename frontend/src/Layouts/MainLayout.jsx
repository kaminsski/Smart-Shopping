import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout(props) {
  return (
    <>
     <Header></Header>
     {props.children}
    <Footer></Footer>
    </>
  )
}
