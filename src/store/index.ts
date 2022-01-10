import { configureStore } from '@reduxjs/toolkit'; 
import dogsApiSlice from 'features/dogs/dogs_api_slice';
import shoppingCartSlice from 'features/shoppingCart/shoppingCartSlice'; 

const store = configureStore({
  reducer: { 
    shoppingCartReducer: shoppingCartSlice, 
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(dogsApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
