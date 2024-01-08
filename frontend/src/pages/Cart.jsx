import React from 'react'

import CartCard from '../components/CartCard'
const getRole = () =>{
  const user = JSON.parse(localStorage.getItem("user"))
  return user ? user.role : null
}
export default function Cart() {
  const userRole = getRole()
  if(userRole){
    return (
      <>
     <CartCard></CartCard>
      </>
    )
  }else{
   return(window.location.href="/") 
  }
}
