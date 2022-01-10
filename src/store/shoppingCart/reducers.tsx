import { Reducer } from 'redux';
import Shopping_Cart_Store from "./types";

import { Breed, Product } from 'types/interfaces';
 
interface shoppingCartReducerState {
  products: Breed[];
  shoppingCart: Product[];
}
 

const INITIAL_STATE: shoppingCartReducerState = {
  products:[],
  shoppingCart:[]
};

export const shoppingCartReducer: Reducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case Shopping_Cart_Store.ADD_PRODUCT: {
      console.log('reducer', action.payload)
      const selectedItem = state.shoppingCart.find((item:Product) => (item.id == action.payload)); 
      console.log(selectedItem)
      return {
        ...state,
        // products: state.products.map( (item:Product) =>
        //   item.id === action.id ? {...item, selected: true} : item, 
        // ),
        
      };
     
    }
    case Shopping_Cart_Store.REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.push(action.payload),
      };
    }
    case Shopping_Cart_Store.CLEAR_CART: {
      return {
        ...state,
        products:[],
      };
    }
    default: {
      return state;
    }
  }
};
