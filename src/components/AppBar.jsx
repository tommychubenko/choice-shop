import logo2 from '../images/logo2.png';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Badge } from '@mui/material';
import { Find } from './Find';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleAddAllToBasket,
  setAllProductsToState,
  setAllReviews,
  setUserData,
} from 'redux/slices';
import { useEffect, useState } from 'react';
import localStorage from 'redux-persist/es/storage';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, storage } from 'config/firebase';
import { db } from 'config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Block, Loading, Notify } from 'notiflix';
import blankUser from '../images/blank-user.png';
import { MobileMenu } from './MobileMenu';

export const AppBar = () => {
  const [mobileSearch, setMobileSearch] = useState(false);
  var viewport_width = window.innerWidth;
  const productsInBasket = useSelector(state => state.basket);
  const user = useSelector(state => JSON.parse(state.user));
  const amountinBasket = Object.keys(productsInBasket).length;
  const dispatch = useDispatch();

  const productsRef = collection(db, 'products');
  const reviewsRef = collection(db, 'reviews');

  useEffect(() => {
    const observer = onAuthStateChanged(auth, user => {
      dispatch(setUserData(JSON.stringify(user) || null));
    });

    return () => observer;
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage
        .getItem('basket')
        .then(r => dispatch(handleAddAllToBasket(JSON.parse(r))));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllProductsFromFireStore();
    getAllReviewsFromFireStore();
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(productsInBasket));
  }, [productsInBasket]);

  async function getAllProductsFromFireStore() {
    try {
      // Loading.dots();
      const data = await getDocs(productsRef);
      // Block.standard('.main-page', 'Please wait...', {
      //   backgroundColor: 'rgba(0,0,0,0.1)',
      //   });
      // Block.standard('.main-page_markup');
      const filtredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setAllProductsToState(filtredData));
      // Block.remove('.main-page');
      // Loading.remove();
    } catch (error) {
      Notify.failure('Не зміг завантажити продукти');
      // Block.remove('.main-page');
      // Loading.remove();
    }
  }

  async function getAllReviewsFromFireStore() {
    try {
      const data = await getDocs(reviewsRef);
      const filtredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setAllReviews(filtredData));
    } catch (error) {
      Notify.failure('Не зміг завантажити продукти');
    }
  }

  return (
    <div>
      <div className="appbar">
        <p className="logo_text">
          Офіційний магазин-партнер торгових марок CHOICE PHYTO, Green Max,
          White Mandarin, BIOX, PRO HEALTHY, Добра Їжа
        </p>      
        {/* <div className="container"> */}
        {mobileSearch ? (
          <div className="find_mobile">
            <Find />{' '}
            <div className="find_close">
              <NotInterestedIcon
                htmlColor="#ffffff"
                fontSize="large"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setMobileSearch(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="toolbar">
            <a href="/" className="logo">
              <h1 className="logo">ecoshop</h1>
              {/* {window.innerWidth} */}
            </a>

            <div className="find">
              <Find />
            </div>
            <SearchIcon
              fontSize="large"
              htmlColor="#FFFFFF"
              className="searchIcon"
              onClick={() => {
                setMobileSearch(true);
              }}
            />
            <div className="appbar_menu">
              <Badge badgeContent={amountinBasket} color="warning">
                <Link to="basket">
                  <AddShoppingCartRoundedIcon
                    htmlColor="#FFFFFF"
                    fontSize="large"
                    className="basketBtn"
                  />
                </Link>
              </Badge>
              <Link to={'auth'}>
                {user ? (
                  <Avatar
                    alt={user?.displayName}
                    src={user?.photoURL ?? blankUser}
                  />
                ) : (
                  <AccountCircleRoundedIcon
                    htmlColor="#FFFFFF"
                    fontSize="large"
                  />
                )}
              </Link>
              <MobileMenu />
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};
