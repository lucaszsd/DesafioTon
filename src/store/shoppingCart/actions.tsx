import Shopping_Cart_Store from "./types";
  
export function addProductToCart(id: string) { 
  return {
    type: Shopping_Cart_Store.ADD_PRODUCT,
    payload: id
  };
}

export function removeProductFromCart(id: string) {
  return {
    type: Shopping_Cart_Store.REMOVE_PRODUCT,
    payload: id
  };
}

export function clearCart() {
  return {
    type: Shopping_Cart_Store.CLEAR_CART
  };
}

export default {
  addProductToCart,
  removeProductFromCart,
  clearCart
}