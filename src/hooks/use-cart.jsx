import { useState } from "react";
import { addToLocalStorage, getLocalStorageCart } from "../modules/cart";

export default function useCart() {

    const [cart, setCart] = useState(getLocalStorageCart());

    function addToCart(product) {
        setCart(prev => [...prev, product]);
        addToLocalStorage(product);
    }

    return{
        cart,
        addToCart,
    }
}