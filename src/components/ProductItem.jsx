import { useLocation } from 'react-router-dom';
import { Link } from './App.styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { handleAddToCart } from 'redux/slices';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@mui/material';
import { firebaseImg } from 'config/firebase';

export const ProductItem = ({ product }) => {
  const location = useLocation();
  const dispath = useDispatch();
  const basket = useSelector(store => store.basket);
  const reviews = useSelector(store => store.reviews);
  const reviewsForThisProduct = reviews?.filter(
    review => review?.cid === product?.cid
  );
  const checkThatInTheCart = id => basket.some(product => product.cid === id);


  const rating =
    reviewsForThisProduct?.reduce((acc, review) => {
      acc += review?.rating;
      return acc;
    }, 0) / reviewsForThisProduct?.length;

  


  return (
    <div className="card">
      <Link
        to={`/products/${product.cid}/about`}
        state={{ from: location }}
        className="card_link"
      >
        <img
          src={firebaseImg(product?.cid)}     
          alt={product.product}
          className="card_image"
          loading="lazy"
        />
      </Link>
      <div className="card_footer-block">
        <Link to={`/products/${product.cid}/about`} state={{ from: location }}>
          <h2 className="card_title">{product.product}</h2>
        </Link>

        <div className="card_footer-price-block">
         {rating > 1 && <Rating value={rating} precision={0.5} readOnly size="small" />}
          <p className="card_price">Ціна {product.price} грн</p>

          {checkThatInTheCart(product.cid) && (
            <CheckCircleOutlineIcon fontSize="large" className="global-color" />
          )}

          {!checkThatInTheCart(product.cid) && (
            <AddShoppingCartIcon
              fontSize="large"
              className="global-color"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispath(handleAddToCart(product));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
