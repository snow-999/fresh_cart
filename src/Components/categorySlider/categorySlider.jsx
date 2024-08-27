import { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios'

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };
  const [category, setCategory] = useState([])
  async function getcategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategory(data.data);
  }
  useEffect(() => {
    getcategories()
  }, [])


  return <>
    <h2 className='text-2xl text-main'>CategorySlider</h2>
    <Slider {...settings}>
      {category?.map((category, index) => <div key={index}>
        <img src={category.image} alt={category.name} className='h-[200px] w-full' />
        <h3>{category.name}</h3>
      </div>)}
    </Slider>

  </>
}
