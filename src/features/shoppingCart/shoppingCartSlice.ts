import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShoppingCartReducerState } from 'types/interfaces';

const initialState: ShoppingCartReducerState = {
  products:[],
  shoppingCart: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    // increment
    increment(state) {
      // state.value += 1;
    },

    // decrement
    decrement(state) {
      // state.value -= 1;
    },

    // reset
    reset(state) {
      // state.value = initialState.value;
    },

    // increment by custom count
    addCount(state, action: PayloadAction<number>) {
      // state.value += action.payload;
    },

    addProductToCart(state, action: PayloadAction<string>){
      console.log(action.payload)
      state.shoppingCart.push({id: action.payload, quantity: 1, selected: true})
      console.log(state.shoppingCart);
    },

    removeProductFromCart(state, action: PayloadAction<string>){ 
      state.shoppingCart = state.shoppingCart.filter(item => item.id != action.payload)  
    },
    
  },
});

export const { increment, decrement, reset, addCount, addProductToCart, removeProductFromCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
