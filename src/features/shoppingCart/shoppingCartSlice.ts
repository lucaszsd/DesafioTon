import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Breed, ShoppingCartReducerState } from 'types/interfaces';

const initialState: ShoppingCartReducerState = {
  products:[],
  shoppingCart: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: { 
    setProductList(state, action: PayloadAction<Breed[]>){
      state.products = action.payload; 
    },

    addProductToCart(state, action: PayloadAction<string>){ 
      state.shoppingCart.push({id: action.payload, quantity: 1, selected: true}) 
    },

    removeProductFromCart(state, action: PayloadAction<string>){ 
      state.shoppingCart = state.shoppingCart.filter(item => item.id != action.payload)  
    },
    
  },
});

export const { addProductToCart, removeProductFromCart, setProductList } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
