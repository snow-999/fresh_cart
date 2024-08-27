import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();
export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(false)
    let headers = {
        token: localStorage.getItem("userToken")
    }
    async function addToCart(productId) {
        try {
            setLoading(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId
            }, {
                headers
            })
            toast.success(data.message, {
                duration: 2000,
                position: "top-right"
            })
            setCart(data)
            console.log(cart);

            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    async function getCart() {
        try {
            setLoading(true)
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    headers
                });
            setCart(data)
            setLoading(false)


        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    async function updateCart(productId, count) {
        if (count > 0) {
            try {
                setLoading(true)
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    {
                        count
                    }, {
                    headers
                });
                setCart(data)
                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        } else {
            deletFromCart()
        }
    }
    async function deletFromCart(productId) {
        try {
            setLoading(true)
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers
                });
            setCart(data)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    async function clearCart() {
        try {
            setLoading(true)
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                });
            console.log(data);

            setCart(null)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    async function checkout(shippingAddress) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`, {
                shippingAddress
            }, {
                headers
            });
            console.log(data);
            window.location.href = data.session.url
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getCart()
    }, [])
    return <CartContext.Provider value={{ clearCart, checkout, cart, setCart, addToCart, getCart, updateCart, loading, deletFromCart }}>
        {children}
    </CartContext.Provider>
} 