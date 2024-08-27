// import React, { useState } from 'react'
// import style from './ProductProtector.module.css'
// import Navbar from '../Navbar/Navbar'
import { Navigate } from 'react-router-dom'

export default function ProductProtector({ children }) {

  if (localStorage.getItem('userToken')) {
    return children
  } else {
    return <Navigate to={"/login"} />
  }

}
