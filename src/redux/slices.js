import {createSlice } from '@reduxjs/toolkit';
import { filterByBrand, setMinPrice, setMaxPrice, filterByGroup, setToBasket, plusToBasket, minusToBasket, deleteFromBasket, filterByProgram, filterByUsage } from './operations';

export const user = createSlice({
  name: 'User', 
  initialState: null,
  reducers: {
    setUserData(state, action){
      return state = action.payload
    }
  }
})

export const reviews = createSlice({
  name: 'Reviews', 
  initialState: null,
  reducers: {
    setAllReviews(state, action){
      return state = action.payload
    }
  }
})


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
    initialState: { brands: "", groups: "", minprice: 0, maxprice: 0, program: "", usage: ''   },
    reducers: {

      resetAllFilters(state, action){
       return state = { brands: "", groups: "", minprice: 0, maxprice: 0, program: "", usage: ''   }
      },

      selectedPrograms(state, action){    
        filterByProgram(state, action)
      },
      selectedUsage(state, action){
        filterByUsage(state, action)
      },

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
export const {setUserData} = user.actions
export const {setAllReviews} = reviews.actions
export const { setAllProductsToState} = allProducts.actions;
export const { handleFind } = find.actions;
export const { selectedBrands, selectedGroups, handleSetMinPrice, handleSetMaxPrice, selectedPrograms, selectedUsage, resetAllFilters } = filter.actions;
export const { handleAddToCart, handleIncrement, handleDecrement,handleDelete, deleteAll, handleAddAllToBasket } = basket.actions;