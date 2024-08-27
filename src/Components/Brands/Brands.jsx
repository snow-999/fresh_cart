import { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'

export default function Brands() {
  const [brands, setBrands] = useState()
  async function getBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      console.log(data);
      setBrands(data.data)

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBrands()
  }, [])

  return <>

    <h1 className="text-3xl text-center text-green-700">Brands</h1>
    {!brands ? <div className="text-center">
      <i className="fas fa-spinner fa-spin fa-pulse text-4xl"></i>
    </div> : <div>
      <div className="flex w-3/4 mx-auto justify-center item-center flex-wrap">
        {brands.map((brand, index) => <div key={index} className={`w-1/4 ${style.brand}`}>
          <div className={`h-[300px] m-4 ${style.border}`}>
            <img className="w-full h-[250px]" src={brand.image} alt={brand.name} />
            <h2 className="my-3 text-main text-xl text-green-700 text-center">{brand.name}</h2>
          </div>

        </div>)}
      </div>
    </div >}
  </>
}
