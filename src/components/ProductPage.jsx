import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { BackBtn, OutletLink } from './App.styled';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { handleAddToCart } from 'redux/slices';
import { Reviews } from './pages/Reviews';

export const ProductPage = () => {
  const allProducts = useSelector(state => state.products);
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState('');
  const savedNavigate = useRef(location.state?.from);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const product = allProducts.filter(product => +product.cid === +id);
    setProduct(...product);
    if (!product) {
      navigate('/');
    }
  }, [allProducts, id, navigate]);

  // const {bigImg, price, zastosuvannya} = product;
  const basket = useSelector(store => store.basket);
  const checkThatInTheCart = id => basket.some(product => product.cid === id);
  return (
    <>
      {product && (
        <div className="productCard">
          {/* <BackBtn to={savedNavigate.current ?? 'xxx'}> */}
          <OutletLink to={savedNavigate.current ?? '/'}>Назад</OutletLink>
          <p className="productCard_title">{product?.product}</p>
          <div className="productCard_info">
            <img
              className="productCard_info-image"
              src={product?.bigImg}
              alt=""
            />
            <div className="productCard_info-wrapper">
              <div className="productCard_info-price-wrapper">
                <div className="productCard_info-price">
                  {'Ціна ' + product?.price + ' грн'}
                </div>{' '}
                <DoubleArrowIcon className="global-color" />{' '}
                <p
                  onClick={() => {
                    dispatch(handleAddToCart(product));
                  }}
                  className="productCard_info-addtocart"
                >
                  {checkThatInTheCart(product.cid)
                    ? 'Товар додано'
                    : `Додати в корзину `}
                </p>
                {checkThatInTheCart(product.cid) && (
                  <CheckCircleOutlineIcon
                    fontSize="large"
                    className="global-color"
                  />
                )}{' '}
              </div>
              {product?.zastosuvannya && (
                <>
                  <p className="productCard_info-usage">застосування: </p>
                  <a href="/" className="productCard_info-usage-link">
                    {product?.zastosuvannya}
                  </a>
                </>
              )}

              {product?.programma && (
                <div className="productCard_info-program-wrapper">
                  <p className="productCard_info-program">програма: </p>
                  {typeof product?.programma === 'string' ? (
                    <a href="/" className="productCard_info-program-link">
                      {product?.programma}{' '}
                    </a>
                  ) : (
                    product?.programma.map((prog, index) => (
                      <a
                        key={index}
                        href="/"
                        className="productCard_info-program-link"
                      >
                        {prog}
                      </a>
                    ))
                  )}
                </div>
              )}
              <p className="productCard_info-benefits">переваги: </p>
              <ul className="productCard_info-benefits-list">
                {product.benefits &&
                  product?.benefits?.map((benefit, index) => (
                    <li key={index} className="productCard_info-benefits-item">
                      <CheckCircleOutlineIcon className="global-color" />{' '}
                      {benefit}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="productCard_info-reviews">
              <Reviews id={id} />
            </div>
          </div>
          <div className="productCard_info-reviews-mobileandtablet">
              <Reviews id={id} />
            </div>
          <div className="productCard_btnlist">
            {product?.about !== '' && product?.about && (
              <OutletLink to="about">Опис</OutletLink>
            )}
            {product?.components !== '' && product?.components && (
              <OutletLink to="components">Компоненти</OutletLink>
            )}
            {product?.diia !== '' && product?.diia && (
              <OutletLink to="diia">Дія комплексів</OutletLink>
            )}
            {product?.usage !== '' && product?.usage && (
              <OutletLink to="usage">Використання</OutletLink>
            )}
            <OutletLink to="addreview" 
            // state={{ id: id }}
            >
              Додати відгук про товар
            </OutletLink>
          </div>

          <div className="productCard_outlet">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};
