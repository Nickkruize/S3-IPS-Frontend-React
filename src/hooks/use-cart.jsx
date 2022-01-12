import { useState } from "react";
import { addToLocalStorage, getLocalStorageCart } from "../modules/cart";

export default function useCart() {

    const [cart, setCart] = useState(getLocalStorageCart());

    // function addToCart(product) {
    //     setCart(prev => [...prev, product]);
    //     addToLocalStorage(product);
    // }

    function addToCart(product) {
        setCart((prev) => {
          const existing = cart.find(
            (item) => item.id === product.id,
          );
    
          return existing
            ? [
                ...cart.map((item) =>
                  item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item,
                ),
              ]
            : [...prev, { ...product, qty: 1 }];
        });
        addToLocalStorage(product);
      }

      function removeFromCart(product) {
        setCart((prev) => [
          ...prev.filter((item) => item.id !== product.id),
        ]);
      }

      function changeQty(product, qty) {

        if (qty === 0) return removeFromCart(product);
    
        setCart((prev) => [
          ...prev.map((item) =>
            item.id === product.id ? { ...item, qty } : item,
          ),
        ]);
      }

    return{
        cart,
        addToCart,
        removeFromCart,
        changeQty,
    }
}