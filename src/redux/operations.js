export const filterByBrand = (state, action) => {
  state.brands = action.payload;
  state.groups = '';
};

export const filterByGroup = (state, action) => {
  state.brands = '';
  state.groups = action.payload;
};

export const setMinPrice = (state, action) => {
  state.minprice = action.payload;
};

export const setMaxPrice = (state, action) => {
  state.maxprice = action.payload;
};

export const setToBasket = (state, action) => {
  if (!state.some(product => product.id === action.payload.id)) {
    state.push({ ...action.payload, amount: 1 });
  }
};

export const plusToBasket = (state, action) => {
  state.forEach(product => {
    if (product.cid === action.payload) {
      product.amount += 1;
    }
  });
};

export const minusToBasket = (state, action) => {
  state.forEach(product => {
    if (product.cid === action.payload && product.amount > 1) {
      product.amount -= 1;
    }
  });
};

export const deleteFromBasket = (state, action) => {  
  const index =  state.indexOf(state.find(product => product.cid === action.payload)) 
  state.splice(index, 1)
  
};


