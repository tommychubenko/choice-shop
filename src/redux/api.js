import axios from 'axios';

// axios.defaults.baseURL = `https://${process.env.REACT_APP_WEATHER_API_KEY}.mockapi.io`;

// Products
// GET

export const getProducts = async () =>
  axios.get(`https://${process.env.REACT_APP_WEATHER_API_KEY}.mockapi.io/products`).then(r => r.data);

  // ADD

export const sendItem = (data) => 
  axios.post(`https://${process.env.REACT_APP_WEATHER_API_KEY}.mockapi.io/products`, data)


// FIX

export const fixItem = async (data, id) => 
  axios.put(`https://${process.env.REACT_APP_WEATHER_API_KEY}.mockapi.io/products/${id}`, data)




//Get orders

export const getOrders = async () =>
  axios.get(`https://${process.env.REACT_APP_WEATHER_API_KEY}.mockapi.io/orders`);

// Send orders

export const sendOrderToBack = async (data) => 
   axios.post(`https://${process.env.REACT_APP_WEATHER_API_KEY}.mockapi.io/orders`, data)



