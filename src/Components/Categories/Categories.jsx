import axios from "axios"
import { useEffect, useState } from "react";
import style from "./Categories.module.css"

export default function Categories() {


  const [categories, setCategories] = useState()
  async function getCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      console.log(data);
      setCategories(data.data)

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  return <>

    {!categories ? <div className="text-center">
      <i className="fas fa-spinner fa-spin fa-pulse text-4xl"></i>
    </div> : <div>
      <div className="flex w-3/4 mx-auto justify-center item-center flex-wrap">
        {categories.map((category, index) => <div key={index} className={`w-1/4 ${style.cat}`}>
          <div className={`h-[300px] m-4 ${style.border}`}>
            <img className="w-full h-[250px]" src={category.image} alt={category.name} />
            <h2 className="my-3 text-main text-xl text-green-700 text-center">{category.name}</h2>
          </div>

        </div>)}
      </div>
    </div >}

  </>
}
