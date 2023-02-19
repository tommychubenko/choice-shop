import { configureStore } from '@reduxjs/toolkit';
import {basket, filter, allProducts, find } from './slices'

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';



export const store = configureStore({
  reducer: {
    products: allProducts.reducer,
    find: find.reducer,
    filter: filter.reducer,
    basket: basket.reducer
  },
});


