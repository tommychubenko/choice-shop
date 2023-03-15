import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import nplogo from '../images/nplogo.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteAll } from 'redux/slices';
// import { toggleBasket } from 'hooks/functions';
import { useNavigate } from 'react-router';
import { addNewOrderToFireStore, monoCardHref } from './admin/adminFunctions';
import { Link } from 'react-router-dom';
import { height } from '@mui/system';
import { firebaseImg } from 'config/firebase';

export const OrderDetails = ({ back }) => {
  const TOKEN = process.env.REACT_APP_TG_TOKEN;
  const CHAT_ID = '-1001884150567';
  const API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  const user = useSelector(state => JSON.parse(state.user));

  const [contact, setContact] = useState('');
  const [prepayment, setPrepayment] = useState(true);
  const [orderHasDone, setOrderHasDone] = useState(false);

  const [cityInput, setCityInput] = useState();
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  const [divisionInput, setDivisionInput] = useState();
  const [divisionsList, setDivisionsList] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState();

  const productsInBasket = useSelector(state => state.basket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderId = Math.floor(new Date().getTime() / 1000);

  // const orderConfirmedByClient = () => {
  //   localStorage.removeItem('basket');
  //   dispatch(deleteAll());
  //   setOrderHasDone(false);
  //   navigate('/');
  // };

  const sendOrder = () => {
    const mysum = productsInBasket.reduce((acc, product) => {
      acc += +product.myprice;
      return acc;
    }, 0);

    const sum = productsInBasket.reduce((acc, product) => {
      acc += +product.price;
      return acc;
    }, 0);

    const data = `<b>Нове замовлення №${orderId}:</b>
    \n Отримувач:  ${contact?.name} ${contact?.surname};
    \n Телефон: ${contact?.tel};
    \n Замовлення:\n${productsInBasket.map(
      order => `\n - ${order.product} - кількість ${order.amount}`
    )}
    \n Оплата -  ${
      prepayment
        ? `Клієнт оплачує мені на картку ${sum} грн, загальна вартість яку я маю Вам сплатити ${mysum} грн, прошу відправити на відділення НП за рахунок клієнта, оплату зі свого боку гарантую, та додам скріншот`
        : `Клієнт хоче отримати товар наложеним платежем, Я зараз сворю інтернет накладну і відправлю Вам, загальна вартість яку я маю Вам сплатити складає ${mysum} гривень, оплату зі свого боку гарантую, та додам скріншот`
    }
    \n Відправити на: ${selectedCity?.Present}, на ${
      selectedDivision?.Description
    }`;

    setOrderHasDone(true);

    // sendOrderToBack({products: productsInBasket, tel: +contact.tel});
    addNewOrderToFireStore({
      myid : orderId,
      contact: contact,
      uid: user?.uid ?? contact?.tel,
      products: productsInBasket,    
      date: orderId,
      payed: false
    });

    axios.post(API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: data,
    });

    localStorage.removeItem('basket');
    dispatch(deleteAll());

    return;
  };

  const totalPrice = productsInBasket.reduce((acc, product) => {
    acc += +product.price * +product.amount;
    return acc;
  }, 0);

  const memoizedValue = useMemo(
    // compute
    () => totalPrice,
    // deps
    []
  );

  const removeCity = () => {
    localStorage.removeItem('selectedcity');
    setSelectedCity();
    localStorage.removeItem('selecteddivision');
    setSelectedDivision();
  };

  const removeDivision = () => {
    localStorage.removeItem('selecteddivision');
    setSelectedDivision();
  };

  const fetchWarehouse = () => {
    const options = {
      apiKey: '',
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityName: selectedCity?.MainDescription,
        // CityRef: "e71d006d-4b33-11e4-ab6d-005056801329",
        Page: '1',
        Limit: '10',
        Language: 'UA',
        // TypeOfWarehouseRef: '00000000-0000-0000-0000-000000000000',
        WarehouseId: divisionInput,
      },
    };

    try {
      axios
        .post('https://api.novaposhta.ua/v2.0/json/', options)
        .then(r => setDivisionsList(r?.data?.data[0]));
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCity = data => {
    const options = {
      apiKey: '',
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: `${data}`,
        Limit: '1',
        Page: '1',
      },
    };

    try {
      axios
        .post('https://api.novaposhta.ua/v2.0/json/', options)
        .then(r => setCitiesList(r?.data?.data[0]?.Addresses));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    divisionInput !== '' && fetchWarehouse(selectedCity?.Ref);
    // eslint-disable-next-line
  }, [divisionInput]);

  useEffect(() => {
    cityInput !== '' && fetchCity(cityInput);
  }, [cityInput]);

  useEffect(() => {
    setCitiesList('');
    setCityInput(selectedCity?.Present);
  }, [selectedCity]);

  useEffect(() => {
    setDivisionsList('');
    // setCityInput(selectedCity?.Present);
  }, [selectedDivision]);

  useEffect(() => {
    if (!contact) {
      try {
        const r = localStorage.getItem('contact');
        setContact(JSON.parse(r));
      } catch (error) {
        console.error(error.message);
      }
    }

    if (contact) {
      localStorage.setItem('contact', JSON.stringify(contact));
    }

    if (!selectedCity) {
      try {
        const r = localStorage.getItem('selectedcity');
        setSelectedCity(JSON.parse(r));
      } catch (error) {
        console.log(error.message);
      }
    }

    if (selectedCity) {
      localStorage.setItem('selectedcity', JSON.stringify(selectedCity));
    }

    if (!selectedDivision) {
      try {
        const r = localStorage.getItem('selecteddivision');
        setSelectedDivision(JSON.parse(r));
      } catch (error) {
        console.log(error.message);
      }
    }

    if (selectedDivision) {
      localStorage.setItem(
        'selecteddivision',
        JSON.stringify(selectedDivision)
      );
    }
  }, [selectedCity, selectedDivision, contact]);

  useEffect(()=>{
    user && setContact(ps => ({ ...ps, email: user?.email }))



  }, [])

  return (
    <>
     

      {!orderHasDone && productsInBasket.length > 0 && (
        <div className="order">
          <p className="order_title">Оформлення замовлення</p>

          {/* <div className="order_client-wrapper">
            <input
            id='newclient'
              type="radio"
              name="customer_type"
              className="order_client-input"
              defaultChecked={!user}
              readOnly={true}
              // defaultChecked={true}
            />
            <label htmlFor='newclient' className="order_client-label"> Я новий покупець</label>

            <input
              id='actualclient'
              type="radio"
              name="customer_type"
              // disabled={true}
              readOnly={true}
              defaultChecked={user}
              className="order_client-input"
            />
            <label htmlFor='actualclient' className="order_client-label" >Я постійний покупець</label>
          </div> */}

          <div className="order_client-data-wrapper">
            <div className="order_client-data-wrapper-ids">
              <div>
                <label htmlFor="name" className="order_client-data-label">
                  Ваше ім'я
                </label>
                <input
                  type="text"
                  className="order_client-data-input"
                  id="name"
                  defaultValue={contact?.name}
                  onChange={e =>
                    setContact(ps => ({ ...ps, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="surname" className="order_client-data-label">
                  Ваше призвіще
                </label>
                <input
                  type="text"
                  className="order_client-data-input"
                  id="surname"
                  defaultValue={contact?.surname}
                  onChange={e =>
                    setContact(ps => ({ ...ps, surname: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="order_client-data-wrapper-ids">
              <div>
                <label htmlFor="tel" className="order_client-data-label">
                  Ваш номер телефону
                </label>
                <input
                  type="tel"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  className="order_client-data-input"
                  id="tel"
                  placeholder="+380..."
                  defaultValue={contact?.tel}
                  onChange={e =>
                    setContact(ps => ({ ...ps, tel: e.target.value }))
                  }
                />
              </div>
              <div>
                {' '}
                <label htmlFor="email" className="order_client-data-label">
                  Ваша електронна пошта
                </label>
                <input
                  type="email"
                  className="order_client-data-input"
                  id="email"               
                  readOnly={user ? true : false}
                  // placeholder="+380..."
                  defaultValue={user ? user?.email : contact?.email}
                  onChange={e =>
                    setContact(ps => ({ ...ps, email: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="order_data-title">1. ВАШЕ ЗАМОВЛЕННЯ</div>
          <div className="order_data-data">
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
              className="order_data-btn"
            >
              НАЗАД В КОРЗИНУ
            </button>
            <ul className="order_data-list">
              {productsInBasket.map((item, index) => (
                <li key={item.cid} className="order_data-item">
                  <p className="order_data-count">{index + 1}</p>
                  <img
                    src={firebaseImg(item.cid)} 
                    alt="logo"
                    className="order_data-image"
                  />{' '}
                  <p className="order_data-name">{item.product}</p>
                  <div className="order_data-thumb">
                  <div className="order_data-price-wrapper">
                    <p className="order_data-price-label">ціна</p>
                    <p className="order_data-price-count">
                      {item.price + ' грн'}
                    </p>
                  </div>
                  <div className="order_data-price-wrapper">
                    <p className="order_data-price-label">кількість</p>
                    <p className="order_data-price-count">{item.amount}</p>
                  </div>
                  <div className="order_data-price-wrapper">
                    <p className="order_data-price-label">сума</p>
                    <p className="order_data-price-count">
                      {item.amount * item.price + ' грн'}
                    </p>
                  </div>
                  </div>
                </li>
              ))}

              <li className="order_data-summary">
                <p>{'Всього ' + totalPrice + ' грн'}</p>
                <p>{totalPrice > 500 && prepayment ? <> Вартість доставки: <b> БЕЗКОШТОВНО</b></>: <>Вартість доставки відповідно до тарифів Нової пошти</>}</p>
              </li>
            </ul>
          </div>

          <div className="order_data-title">2. ОПЛАТА</div>

          <div className="order_delivery-type1-wrapper">
            {/* <img
          className="order_delivery-type1-logo"
          src={nplogo}
          alt="Nova poshta"
        /> */}
            <div className="order_delivery-type1-method-wrapper">
              <div className="order_delivery-type1-method1-wrapper">
                <input
                  type="radio"
                  name="delivery_type"
                  className="order_delivery-input"
                  defaultChecked={true}
                  id="prepay"
                  onClick={() => {
                    setPrepayment(true);
                  }}
                />
                <label className="order_delivery-label" htmlFor="prepay">
                  Оплата на картку
                </label>
              </div>
              <div className="order_delivery-type1-method1-wrapper">
                <input
                  type="radio"
                  name="delivery_type"
                  id="postpay"
                  className="order_delivery-input"
                  onClick={() => {
                    setPrepayment(false);
                  }}
                />
                <label className="order_delivery-label" htmlFor="postpay">
                  Наложений платіж
                </label>
              </div>
            </div>
          </div>
          <div className="order_data-title">3. ДОСТАВКА</div>
          <div className="order_delivery-choose">
            <div className="order_delivery-choose-wrapper">
              <label className="order_delivery-choose-label">
                Введіть місто доставки
              </label>

              {!selectedCity && (
                <input
                  type="text"
                  defaultValue={cityInput}
                  onChange={e => setCityInput(e.target.value)}
                  className="order_delivery-choose-input"
                />
              )}

              {selectedCity && (
                <div className="order_delivery-choose-result-variant-wrapper" >
                  <img
                    src={nplogo}
                    alt="logo"
                    className="order_delivery-choose-result-variant-image"
                  />
                  <p className="order_delivery-choose-result-variant-title">
                    {selectedCity?.Present}
                  </p>
                  <DeleteForeverIcon
                    className="global-color"
                    onClick={() => {
                      removeCity();
                    }}
                  />
                </div>
              )}

           {/* ВІДДІЛЕННЯ */}

              <div className="order_delivery-choose-result">
                {citiesList?.length > 0 &&
                  !selectedCity &&
                  citiesList.map((city, index) => (
                    <div
                      className="order_delivery-choose-result-variant-wrapper"
                      onClick={() => {
                        setSelectedCity(city);
                      }}
                      key={index}
                    >
                      <img
                        src={nplogo}
                        alt="logo"
                        className="order_delivery-choose-result-variant-image"
                      />
                      <p
                        className="order_delivery-choose-result-variant-title"
                        key={index}
                      >
                        {city.Present}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* ВІДДІЛЕННЯ */}

            {selectedCity && (
              <div className="order_delivery-choose-wrapper">
                <label className="order_delivery-choose-label">
                  Введіть номер відділення доставки
                </label>

                {!selectedDivision && (
                  <input
                    type="text"
                    defaultValue={divisionInput}
                    onChange={e => setDivisionInput(e.target.value)}
                    className="order_delivery-choose-input"
                  />
                )}

                {selectedDivision && (
                  <div className="order_delivery-choose-result-variant-wrapper">
                    <img
                      src={nplogo}
                      alt="logo"
                      className="order_delivery-choose-result-variant-image"
                    />
                    <p className="order_delivery-choose-result-variant-title">
                      {selectedDivision?.Description}
                    </p>
                    <DeleteForeverIcon
                  
                      className="global-color"
                      onClick={() => {
                        removeDivision();
                      }}
                    />
                  </div>
                )}

                <div className="order_delivery-choose-result">
                  {!selectedDivision && divisionsList && divisionInput && (
                                      <div
                      className="order_delivery-choose-result-variant-wrapper"
                      onClick={() => {
                        setSelectedDivision(divisionsList);
                      }}
                    >
                      <img
                        src={nplogo}
                        alt="logo"
                        className="order_delivery-choose-result-variant-image"
                      />
                      <p className="order_delivery-choose-result-variant-title">
                        {divisionsList?.Description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {selectedDivision && (
            <div className="order_delivery-summary-wrapper">
              <div className="order_delivery-summary">              
                <button
                  className="order_delivery-summary-button"
                  onClick={() => {
                    sendOrder();
                  }}
                >
                  Замовити
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {orderHasDone && (
        <div className="order_done-wrapper">
          <h2 className='order_done-title'>Ваше замовлення № {orderId} - вже комплектується. </h2>
          <p className='order_done-summary'>
            Його вартість складає <b>{memoizedValue} грн. 00 коп </b>
          </p>

          {prepayment ? (
            <>
              {' '}
              <p  className='order_done-card'>Оплатити можна на картку Моно <b>5375 4115 0610 4301</b> - отримувач Артем Ч. </p>
              <p  className='order_done-card-link'>Також, можна оплатити <a href={monoCardHref} target="_blank">через сайт Monobank
                </a></p>
            </>
          ) : (
            <p  className='order_done-afterpayment'>
              Замовлення буде відправлене Вам наложеним платежем після дзвінка
              менеджера.
            </p>
          )}

          {user ? (
            <p  className='order_done-checkdetails'>
              Перевірити статус свого замовлення ви завжди можете{' '}
              <Link to="/auth/userpage">у себе в кабінеті</Link>
            </p>
          ) : (
            <p className='order_done-checkdetails'>
              Радимо Вам <Link to="/auth">увійти</Link> або{' '}
              <Link to="/register">зареєструватися</Link> на нашому сайті, щоб
              отримувати всі переваги зареєстрованих користувачів
            </p>
          )}         
        </div>
      )}
    </>
  );
};
