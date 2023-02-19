import { useLocation } from 'react-router-dom';
import { Link } from './App.styled';
// import { Container, Header, Logo} from './App.styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { handleAddToCart } from 'redux/slices';
import { useDispatch, useSelector } from 'react-redux';

export const ProductItem = ({ product }) => {
  const location = useLocation();
  const dispath = useDispatch();
  const basket = useSelector(store => store.basket);

  const checkThatInTheCart = id => basket.some(product => product.cid === id);

  return (
    <div className="card">
      <Link to={`/products/${product.cid}`} state={{ from: location }}>
        <img
          src={product.bigImg}
          alt={product.product}
          className="card_image"
          loading="lazy"
        />
      </Link>
      <div className="card_footer-block">
        <Link to={`/products/${product.cid}`} state={{ from: location }}>
          <p className="card_title">{product.product}</p>
        </Link>

        <div className="card_footer-price-block">
          <p className="card_price">Ціна {product.price} грн</p>

          {checkThatInTheCart(product.cid) && <CheckCircleOutlineIcon fontSize='large' htmlColor='#008000'/>}

          {!checkThatInTheCart(product.cid) && (
            <AddShoppingCartIcon
              fontSize="large"
              htmlColor="#008000"
              style={{ cursor: 'pointer' }}
              alt="Додати"
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
