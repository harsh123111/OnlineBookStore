
export const getCart = () => {
    if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"))
    } else {
        return []
    }
}

export const updateCart = (cart) => {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
        alert("Cart is full!")
    }
}