import { useContext } from 'react'
// import style from './RecentProduct.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
// import { TailSpin } from 'react-spinners'
export default function RecentProduct() {
  let { addToCart } = useContext(CartContext)
  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, isLoading } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getProducts,
    select: (data) => data?.data.data
  })
  console.log(data);
  console.log("isLoading", isLoading);


  return <>
    {!isLoading ? <div className='flex flex-wrap'>
      {data.map((product) => <div key={product.id} className='w-1/5 product p-4'>
        <Link to={`productDetails/${product.id}`}>
          <img src={product?.imageCover} className='w-full' alt={product?.title} />
          <h2 className='text-sm'>{product.category?.name}</h2>
          <h2 className='text-sm'>{product?.title?.split(' ')?.slice(0, 2)?.join(' ')}</h2>
          <div className='flex justify-between my-2'>
            <h3>{product?.price} EGP</h3>
            <h3> <i className='fas fa-star rating-color'></i>{product?.ratingsAverage}</h3>
          </div>
        </Link>
        <button onClick={() => addToCart(product.id)} className='btn w-full bg-green-700 p-2 text-white rounded-md font-bold'>Add Cart</button>
      </div>)}
    </div> : <div className='text-center py-10'>
      <i className='fas fa-spinner fa-pulse fa-4x'></i>
    </div>}
  </>
}
