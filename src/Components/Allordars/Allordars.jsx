import { useContext, useEffect } from "react"
import { CartContext } from "../../Context/CartContext"


export default function Allordars() {

  let { clearCart } = useContext(CartContext)
  useEffect(() => {
    clearCart()
  }, [])

  return <>

    <h1 className="text-3xl">Allordars</h1>

  </>
}
