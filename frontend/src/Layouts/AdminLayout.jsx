import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const getRole = () =>{
  const user = JSON.parse(localStorage.getItem("user"))
  return user ? user.role : null
}

export default function AdminLayout(props) {
  const userRole = getRole()
  const navigate = useNavigate()
  if(userRole === "admin"){
    return (
      <>
      
      <Header></Header>
       {props.children}
      <Footer></Footer>
      </>
    )
  }else{
   return(window.location.href="/") 
  }
  
}
