// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Products from './Components/Products/Products.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import UserContextProvider from './Context/UserContetx.jsx'
import ProductProtector from './Components/productProtector/productProtector.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import CartContextProvider from './Context/CartContext.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import Allordars from './Components/Allordars/Allordars.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProductProtector><Home /></ProductProtector> },
      { path: 'cart', element: <ProductProtector><Cart /></ProductProtector> },
      { path: 'products', element: <ProductProtector><Products /></ProductProtector> },
      { path: 'ProductDetails/:id', element: <ProductProtector><ProductDetails /></ProductProtector> },
      { path: 'categories', element: <ProductProtector><Categories /></ProductProtector> },
      { path: 'brands', element: <ProductProtector><Brands /></ProductProtector> },
      { path: 'checkout', element: <ProductProtector><Checkout /></ProductProtector> },
      { path: 'allorders', element: <ProductProtector><Allordars /></ProductProtector> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }
])
let query = new QueryClient
function App() {

  return <QueryClientProvider client={query}>
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </UserContextProvider>
    </CartContextProvider>
  </QueryClientProvider>
}

export default App
