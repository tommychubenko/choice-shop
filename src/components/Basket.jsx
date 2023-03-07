import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {OutletLink } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleIncrement,
  handleDecrement,
  handleDelete,
  deleteAll,
} from 'redux/slices';
import emptyCart from '../images/cart-empty.jpg';
import {useState } from 'react';
import { OrderDetails } from './OrderDetails';
import { useNavigate } from 'react-router';
import { Backdrop } from '@mui/material';

export const Basket = () => {
  // const [purchaised, setPurchaised] = useState(false);
  const productsInBasket = useSelector(state => state.basket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = () => {
    const value = productsInBasket.reduce((acc, product) => {
      acc += +product.price * +product.amount;
      return acc;
    }, 0);
    return value;
  };

  // const turnStateFalse = () => {
  //   setPurchaised(false);
  // };

  return (
    <>
      <Backdrop
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={(e) => {
          e.currentTarget === e.target &&
          navigate(-1);
        }}
      >
        <div className="modal">
          <HighlightOffIcon
            fontSize="large"
            // htmlColor="#008000"

            className="closeBtn global-color"
            onClick={(e) => {
                   navigate(-1);
            }}
          />

          <p className="modal_title">Ваша корзина</p>

          {productsInBasket.length === 0 && (
            <div className=" basket_empty-wrapper">
              <img
                src={emptyCart}
                className="basket_empty-image"
                alt="Empty"
              ></img>
              <p className="basket_empty-text">
                Ваша корзина пуста, але ніколи не пізно почати її наповнювати!
              </p>{' '}
            </div>
          )}

          {/* {purchaised && <OrderDetails back={turnStateFalse} />} */}

          {productsInBasket.length > 0 && (
            <>
              <div
                className="modal_delete"
                onClick={() => {
                  dispatch(deleteAll());
                }}
              >
                Видалити все
              </div>
              <ul className="basket_list">
                {productsInBasket.map(product => (
                  <li key={product.cid} className="basket_item">
                    <img src={`https://firebasestorage.googleapis.com/v0/b/choice-ab93a.appspot.com/o/products%2F${product?.cid}.webp?alt=media&token=936ccefd-3d44-4e51-8067-1891ffdf610a`}  alt="" className="basket_image" />
                    <p className="basket_title">{product.product}</p>
                    <p className="basket_price">{product.price + ' грн'}</p>
                    <div className="basket_amount-manage">
                      <div className="basket_amount-controls">
                        <button
                          type="button"
                          className="basket_amount-btn"
                          onClick={() => {
                            dispatch(handleIncrement(product.cid));
                          }}
                        >
                          +
                        </button>
                        <div className="basket_amount-amount">
                          {product.amount}
                        </div>
                        <button
                          type="button"
                          className="basket_amount-btn"
                          onClick={() => {
                            dispatch(handleDecrement(product.cid));
                          }}
                        >
                          -
                        </button>
                        <DeleteForeverIcon
                          fontSize="large"
                         
                          className="trashBtn global-color"
                          onClick={() => {
                            dispatch(handleDelete(product.cid));
                          }}
                        />
                      </div>
                      <div className="basket_amount-total">
                        {'Всього' +
                          ' ' +
                          product.price * product.amount +
                          ' ' +
                          'грн'}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="basket_total-wrapper">
                <div className="basket_total-box">
                  <p className="basket_total-info">
                    {'Всього ' + totalPrice() + ' грн'}
                  </p>

                  <OutletLink to='/order-details'>Замовити</OutletLink>
                  {/* <button
                    className="basket_total-btn"
                                 >
                    ЗАМОВИТИ
                  </button> */}
                </div>
              </div>
            </>
          )}
        </div>
      </Backdrop>
    </>
  );
};
