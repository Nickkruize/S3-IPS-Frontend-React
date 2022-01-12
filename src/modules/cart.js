export function addToLocalStorage(product){
    const cart = getLocalStorageCart();
    localStorage.setItem("cart", JSON.stringify([
        ...cart, product]));
}

export function getLocalStorageCart(){
    const data = localStorage.getItem("cart");
    if (!data) return []
    return JSON.parse(data);
}

export function removeFromLocalStorage(product) {
    const data = localStorage.getItem("cart");
    if (data.includes(product)) {
        alert("removed product")
    }
}

export function  clearCart() {
    
}