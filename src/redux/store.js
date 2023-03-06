import { configureStore } from '@reduxjs/toolkit';
import {basket, filter, allProducts, find, user, reviews } from './slices'


export const store = configureStore({
  reducer: {
    products: allProducts.reducer,
    find: find.reducer,
    filter: filter.reducer,
    basket: basket.reducer,
    user: user.reducer,
    reviews: reviews.reducer
  },
});


