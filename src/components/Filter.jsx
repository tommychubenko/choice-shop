import {
  AutoAwesome,
  Handyman,
  InsertComment,
  LocationOn,
  PhoneIphone,
  PriceChange,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  selectedBrands,
  selectedGroups,
  handleSetMaxPrice,
  handleSetMinPrice,
  selectedPrograms,
  selectedUsage,
} from 'redux/slices';
import { MobileMenu } from './MobileMenu';

export const Filter = ({place}) => {
  const allProducts = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [brands, setBrands] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [usage, setUsage] = useState([]);
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

    const allPrograms = allProducts.flatMap(product => product?.programma);
    const uniquePrograms = allPrograms
      .filter((course, index, array) => array.indexOf(course) === index)
      .filter(prog => prog !== '');
    setPrograms(uniquePrograms);

    const allusage = allProducts.flatMap(product => product?.zastosuvannya);

    const uniqueUsage = allusage
      .filter((course, index, array) => array.indexOf(course) === index)
      .filter(prog => prog !== '');
    setUsage(uniqueUsage);
  }, [allProducts]);

  return (
    <>

    <div className="filter_contacts-wrapper">
      <ul className='filter_contacts-list'>
        <li className="filter_contacts-item"><a href="tel:380950201222" className='filter_contacts-link'><PhoneIphone/>+38 (095) 020-12-22</a></li>
        <li className="filter_contacts-item"><a className='filter_contacts-link'><LocationOn />м.Полтава, ТРЦ Мир</a></li>    
        {/* <li className="filter_contacts-item"></li> */}

      </ul>
    </div>

      <nav className="filter">
        <p className="filter_title">
          
          <AutoAwesome /> Вибір за брендом
        </p>

        {brands && (
          <ul className="filter_brand">
            {brands.map(brand => (
              <li
                key={brands.indexOf(brand)}
                className="filter_item"
                onClick={() => {
                  navigate('/');
                }}
              >
                <label className="filter_label" htmlFor={brand + place}>
                  <input
                    className="filter_checkbox"
                    type="radio"
                    name="brand"
                    id={brand  + place}
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
                            onClick={
                              () => {                            
                              dispatch(selectedGroups(group))
                            }
                          }
                           
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

        <div className="filter_program">
          <p className="filter_title">
            <InsertComment /> Вибір за програмою
          </p>
          <ul className="filter_brand">
            {programs.map((prog, index) => (
              <li className="filter_item" key={index}>
                <input
                  className="filter_group-input"
                  type="radio"
                  name="program"
                  id={prog}
                  onClick={() => {
                    dispatch(selectedPrograms(prog));
                  }}
                />
                <label htmlFor={prog} className="filter_label">
                  {prog}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter_usage">
          <p className="filter_title">
            <Handyman /> Вибір по застосуванню
          </p>
          <ul className="filter_brand">
            {usage.map((prog, index) => (
              <li className="filter_item" key={index}>
                <input
                  className="filter_group-input"
                  type="radio"
                  name="program"
                  id={prog}
                  onClick={() => {
                    dispatch(selectedUsage(prog));
                  }}
                />
                <label htmlFor={prog} className="filter_label">
                  {prog}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter_price">
          <p className="filter_title">
            <PriceChange /> Фільтр по ціні
          </p>

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
      </nav>
    </>
  );
};
