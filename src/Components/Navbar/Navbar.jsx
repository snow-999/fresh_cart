import { useState } from 'react'
// import style from './Navbar.module.css'
import { useContext } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContetx'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {
  const [navSlider, setNavSlider] = useState(false)
  let { cart } = useContext(CartContext)
  let nav = useNavigate();
  let { userData, setUserData } = useContext(UserContext);
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    nav('/')
  }

  function Slider() {
    if (navSlider == true) {
      setNavSlider(false)
    } else {
      setNavSlider(true)
    }
  }
  return <>

    <nav className='bg-gray-200  flex px-5 md:fixed justify-between top-0 inset-x-0 py-2  capitalize'>
      <div className="container flex flex-col md:flex-row justify-between text-gray-500">
        <img src={logo} width={120} alt="" />
        <div className=' flex-col hidden md:flex md:flex-row justify-between'>
          <div className='flex flex-col  md:flex-row space-x-3'>

            {userData && <ul className='sm:hidden md:flex flex-col md:flex-row space-x-2'>
              <li><NavLink to="home">Home</NavLink></li>
              <li><NavLink to="products">products</NavLink></li>
              <li><NavLink to="categories">categories</NavLink></li>
              <li><NavLink to="brands">brands</NavLink></li>
            </ul>}
          </div>
          <div className=''>

            <ul className='sm:hidden md:flex flex-col md:flex-row space-x-2 '>
              {userData ?
                <>
                  <li><NavLink to="cart"><li className='relative'><span className=' absolute left-1/2 top-[-2px] text-white'>{cart ? cart.numOfCartItems : 0}</span><i className="text-green-500 text-3xl fa-solid fa-cart-shopping "></i></li>                </NavLink></li>
                  <li onClick={logOut}><span className='cursor-pointer'>logout</span></li></> :
                <>
                  <li><NavLink to="">Login</NavLink></li>

                  <li><NavLink to="register">Register</NavLink></li>
                </>}

            </ul>
          </div>
        </div>
        <div className='mobileNav md:hidden'>
          <div className='md:hidden'>
            <i onClick={() => { Slider() }} className=" fa-solid fa-bars text-2xl cursor-pointer"></i>

          </div>
          {navSlider && <div className='flex  flex-col items-center justify-center'>
            {userData && <ul className=' mt-4 w-full space-y-4 flex flex-col text-center items-center justify-center space-x-2'>
              <li className='w-full'><NavLink to="">Home</NavLink></li>
              <li className='w-full'><NavLink to="products">products</NavLink></li>
              <li className='w-full'><NavLink to="categories">categories</NavLink></li>
              <li className='w-full'><NavLink to="brands">brands</NavLink></li>
            </ul>}
            <div className=' block'>

              <ul className='flex justify-center items-center flex-col md:flex-row space-x-2'>
                {userData ?
                  <>
                    <li><NavLink to="cart"><li className='relative'><span className=' absolute left-1/2 top-[-2px] text-white'>{cart ? cart.numOfCartItems : 0}</span><i className="text-green-500 text-3xl fa-solid fa-cart-shopping "></i></li>                </NavLink></li>
                    <li onClick={logOut}><span className='cursor-pointer'>logout</span></li></> :
                  <>
                    <li className='w-[40px]'><NavLink to="">Login</NavLink></li>

                    <li className='w-[40px]'><NavLink to="register">Register</NavLink></li>
                  </>}

              </ul>
            </div>
          </div>}
        </div>
      </div>


    </nav >

  </>
}
