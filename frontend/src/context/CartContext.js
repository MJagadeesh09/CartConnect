import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const loadCart = () => {

        const email = localStorage.getItem("email");

        if (!email) {

            setCartItems([]);
            setCartCount(0);
            return;

        }

        API.get(`/api/cart/${email}`)
            .then((res) => {

                setCartItems(res.data);

                const total = res.data.reduce(

                    (sum, item) => sum + item.quantity,

                    0

                );

                setCartCount(total);

            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {

        loadCart();

    }, []);

    return (

        <CartContext.Provider
            value={{
                cartCount,
                cartItems,
                setCartItems,
                refreshCartCount: loadCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}