export const filterByBrand = (state, action) => {
  state.brands = action.payload;
  state.groups = '';
  state.program = '';
  state.usage = '';
};


export const filterByGroup = (state, action) => {
  state.brands = '';
  state.program = '';
  state.usage = '';
  state.groups = action.payload;
};

export const filterByProgram = (state, action) => {
  state.brands = '';
  state.groups = '';
  state.usage = '';
  state.program = action.payload;
};

export const filterByUsage = (state, action) => {
  state.brands = '';
  state.groups = '';
  state.program = '';
  state.usage = action.payload;
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


