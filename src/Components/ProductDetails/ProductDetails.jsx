import { useContext, useEffect, useState } from 'react'
// import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
export default function ProductDetails() {
  let { id } = useParams()
  let { addToCart } = useContext(CartContext)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000, responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [productDetails, setProductDetails] = useState({});
  async function getProductsDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setProductDetails(data.data)
  }

  useEffect(() => {
    getProductsDetails(id)
  }, [])




  return <>

    <div className='flex items-center flex-wrap py-10'>
      <div className='w-full md:w-1/4'>
        <Slider {...settings}>
          {productDetails.images?.map((image, index) => <img key={index} src={image} alt={productDetails.title} className='w-full' />)}
        </Slider>
      </div>
      <div className='w-full md:w-3/4 p-3'>
        <div>
          <h2>{productDetails.title}</h2>
          <h2>{productDetails.category?.name}</h2>
          <h2>{productDetails.description}</h2>
          <div className='flex p-2 justify-between'>
            <h2>{productDetails.price} EGP</h2>
            <h2><i className='fas fa-star rating-color'></i>{productDetails.ratingsAverage}</h2>
          </div>
          <button onClick={() => { addToCart(productDetails.id) }} className='w-full hover:bg-green-500 rounded-md py-2 bg-green-700 text-white'>Add Cart</button>
        </div>
      </div>
    </div>

  </>
}
