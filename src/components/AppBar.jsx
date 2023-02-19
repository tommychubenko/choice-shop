import logo from '../images/logo-white.png';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Badge } from '@mui/material';
import { Find } from './Find';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBasket } from 'hooks/functions';
import { getProducts } from 'redux/api';
import {  
  handleAddAllToBasket,
  setAllProductsToState,
} from 'redux/slices';
import { useEffect } from 'react';
import localStorage from 'redux-persist/es/storage';

export const AppBar = ({ products }) => {
  const productsInBasket = useSelector(state => state.basket);
  const amountinBasket = Object.keys(productsInBasket).length;
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      localStorage
        .getItem('basket')
        .then(r => dispatch(handleAddAllToBasket(JSON.parse(r))));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getProducts().then(r => dispatch(setAllProductsToState(r)));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(productsInBasket));
  }, [productsInBasket]);

  return (
    <div>
      <div className="appbar">
        <div className="toolbar">
          <a href="/">
            <img src={logo} alt="лого" />
          </a>
          <Find products={products} className=" find" />
          <div className="appbar_menu">
            <Badge
              badgeContent={amountinBasket}
              color="warning"
              onClick={() => {
                toggleBasket();
              }}
            >
              <AddShoppingCartRoundedIcon
                htmlColor="#FFFFFF"
                fontSize="large"
                className="basketBtn"
              />
            </Badge>


            <AccountCircleRoundedIcon htmlColor="#FFFFFF" fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};
