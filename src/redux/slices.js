import {createSlice } from '@reduxjs/toolkit';
import { filterByBrand, setMinPrice, setMaxPrice, filterByGroup, setToBasket, plusToBasket, minusToBasket, deleteFromBasket } from './operations';


export const allProducts = createSlice({
    name: 'Products',
    initialState: [],
    reducers: {
      setAllProductsToState(state, action) {
        return (state = action.payload);
      }      
    }
  });
  
  export const find = createSlice({
    name: 'Find',
    initialState: [],
    reducers: {
      handleFind(state, action) {
        return action.payload;
      },
    },
  });
  
  export const filter = createSlice({
    name: 'Filter',
    initialState: { brands: "",groups: "", minprice: 0, maxprice: 0  },
    reducers: {
      selectedBrands(state, action) {
        filterByBrand(state, action)
      },
      handleSetMinPrice(state, action){
        setMinPrice(state, action)
      },
      handleSetMaxPrice(state, action){
        setMaxPrice(state, action)
      },
      selectedGroups(state, action){
        filterByGroup(state, action)
      }
    },
  });
  
  export const basket = createSlice({
    name: 'Basket',
    initialState: [],
    reducers: {
      handleAddAllToBasket(state, action){  
       action.payload.forEach(product => state.push(product))
      },
      handleAddToCart(state, action){
        setToBasket(state, action)
      },
      handleIncrement(state, action){
        plusToBasket(state, action)
      },
      handleDecrement(state, action){
        minusToBasket(state, action)
      },
      handleDelete(state, action){
        deleteFromBasket(state, action)
      },
      deleteAll(state, action){
        state.length = 0
      }
    },
   
  });

export const { setAllProductsToState} = allProducts.actions;
export const { handleFind } = find.actions;
export const { selectedBrands, selectedGroups, handleSetMinPrice, handleSetMaxPrice } = filter.actions;
export const { handleAddToCart, handleIncrement, handleDecrement,handleDelete, deleteAll, handleAddAllToBasket } = basket.actions;