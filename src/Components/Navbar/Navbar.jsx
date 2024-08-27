// import React, { useState } from 'react'
// import style from './Navbar.module.css'
import { useContext } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContetx'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
  let { cart } = useContext(CartContext)
  let nav = useNavigate();
  let { userData, setUserData } = useContext(UserContext);
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    nav('/login')
  }

  return <>

    <nav className='bg-gray-200  md:fixed top-0 inset-x-0 py-2 text-center capitalize'>
      <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
        <div className='flex flex-col md:flex-row space-x-3'>
          <img src={logo} width={120} alt="" />
          {userData && <ul className='flex flex-col md:flex-row space-x-2'>
            <li><NavLink to="">Home</NavLink></li>
            <li><NavLink to="products">products</NavLink></li>
            <li><NavLink to="categories">categories</NavLink></li>
            <li><NavLink to="brands">brands</NavLink></li>
          </ul>}
        </div>
        <div className=''>

          <ul className='flex flex-col md:flex-row space-x-2'>
            {userData ?
              <>
                <li><NavLink to="cart"><li className='relative'><span className=' absolute left-1/2 top-[-2px] text-white'>{cart ? cart.numOfCartItems : 0}</span><i className="text-green-500 text-3xl fa-solid fa-cart-shopping "></i></li>                </NavLink></li>
                <li onClick={logOut}><span className='cursor-pointer'>logout</span></li></> :
              <>
                <li><NavLink to="login">Login</NavLink></li>

                <li><NavLink to="register">Register</NavLink></li>
              </>}
            <li className='space-x-2 text-black'>
              <i className='fab fa-facebook-f'></i>
              <i className='fab fa-linkedin-in'></i>
              <i className='fab fa-youtube'></i>
              <i className='fab fa-twitter'></i>
              <i className='fab fa-instagram'></i>
            </li>

          </ul>
        </div>
      </div>
    </nav >

  </>
}
