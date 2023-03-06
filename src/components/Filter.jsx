import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  selectedBrands,
  selectedGroups,
  handleSetMaxPrice,
  handleSetMinPrice,
} from 'redux/slices';
import { MobileMenu } from './MobileMenu';


export const Filter = () => {
  const allProducts = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(1000);

  const navigate = useNavigate();

  useEffect(() => {
    setMinPrice(Math.min(...allProducts.map(product => product.price)));
    setMaxPrice(Math.max(...allProducts.map(product => product.price)));

    const allBrands = allProducts.map(product => product.subbrand);
    const allUniqueBrands = allBrands.filter(
      (course, index, array) => array.indexOf(course) === index
    );
    setBrands(allUniqueBrands);
  }, [allProducts]);

  return (
    <>
    
   

    <div className="filter">
      <p className="filter_title">Вибір за брендом</p>
    
      {brands && (
        <ul className="filter_brand">
          {/* <li>
            <p className="filter_title">Вибір за брендом</p>
          </li> */}

          {brands.map(brand => (
            <li
              key={brands.indexOf(brand)}
              className="filter_item"
              onClick={() => {
                navigate('/');
              }}
            >
              <label className="filter_label" htmlFor={brands.indexOf(brand)}>
                <input
                  className="filter_checkbox"
                  type="radio"
                  name="brand"
                  id={brands.indexOf(brand)}
                  onClick={() => {
                    dispatch(selectedBrands(brand));
                  }}
                />
                {brand}
                <ul className="filter_group">
                  {allProducts
                    .filter(product => product.subbrand === brand)
                    .reduce((acc, product) => {
                      if (!acc.includes(product.group)) {
                        acc.push(product.group);
                      }
                      return acc;
                    }, [])
                    .map((group, index) => (
                      <li key={index + 100} className="filter_group-item">
                        <input
                          type="radio"
                          name={group}
                          id={group}
                          className="filter_group-input"
                          onClick={() => {
                            dispatch(selectedGroups(group));
                          }}
                        />
                        <label htmlFor={group} className="filter_group-label">
                          {group}
                        </label>
                      </li>
                    ))}
                </ul>{' '}
              </label>
            </li>
          ))}
        </ul>
      )}

      <div className="filter_price">
        <p className="filter_price-title">Фільтр по ціні</p>

        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch(handleSetMaxPrice(+maxPrice + 1));
            dispatch(handleSetMinPrice(+minPrice - 1));
            // navigate('/')
          }}
        >
          <div className="filter_price-thumb">
            Від
            <input
              className="filter_price-input"
              type="text"
              // defaultValue={minPrice}
              value={minPrice}
              onChange={e => {
                setMinPrice(e.target.value);
              }}
            />{' '}
            до
            <input
              className="filter_price-input"
              type="text"
              // defaultValue={maxPrice}
              value={maxPrice}
              onChange={e => {
                setMaxPrice(e.target.value);
              }}
            />
            <button type="submit" className="filter_price-btn">
              Знайти
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
