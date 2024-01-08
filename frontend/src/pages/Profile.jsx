import React from "react";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom'

const getRole = () =>{
  const user = JSON.parse(localStorage.getItem("user"))
  return user ? user.role : null
}

export default function Profile() {
  const userRole = getRole()
  const navigate = useNavigate()

  if(userRole){
    return (
      <>
     <ProfileCard></ProfileCard>
      </>
    )
  }else{
   return(window.location.href="/") 
  }

  
}
