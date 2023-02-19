import axios from 'axios';
import { useEffect } from 'react';
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import nplogo from '../images/nplogo.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { sendOrderToBack } from 'redux/api';
import { deleteAll } from 'redux/slices';
import { toggleBasket } from 'hooks/functions';

export const OrderDetails = ({ back }) => {
  const TOKEN = '5676812113:AAHvO470UJTM3v2TMDZ2WH7eM_X2B0tel9s';
  const CHAT_ID = '-1001884150567';
  const API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const [contact, setContact] = useState();
  const [payment, setPayment] = useState('Передплата на картку');
  const [orderHasDone, setOrderHasDone] = useState(false);

  const [cityInput, setCityInput] = useState();
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  const [divisionInput, setDivisionInput] = useState();
  const [divisionsList, setDivisionsList] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState();

  const productsInBasket = useSelector(state => state.basket);

  const dispatch = useDispatch()

  const orderConfirmedByClient = () => {
    localStorage.removeItem('basket');
    dispatch(deleteAll())
    setOrderHasDone(false)
    toggleBasket()

  }

  const sendOrder = () => {
    const mysum = productsInBasket.reduce((acc, product) => {
      acc += +product.myprice;
      return acc;
    }, 0);

    const sum = productsInBasket.reduce((acc, product) => {
      acc += +product.price;
      return acc;
    }, 0);

    const data = `<b>Нове замовлення:</b>
    \n Отримувач:  ${contact?.name} ${contact?.surname};
    \n Телефон: ${contact?.tel};
    \n Замовлення:\n${productsInBasket.map(
      order => `\n${order.product} - кількість ${order.amount}`
    )}
    \n Оплата -  ${
      payment === 'Передплата на картку'
        ? `Клієнт оплачує мені на картку ${sum} грн, загальна вартість яку я маю Вам сплатити ${mysum} грн, прошу відправити на відділення НП за рахунок клієнта, оплату зі свого боку гарантую, та додам скріншот`
        : `Клієнт хоче отримати товар наложеним платежем, Я зараз сворю інтернет накладну і відправлю Вам, загальна вартість яку я маю Вам сплатити складає ${mysum} гривень, оплату зі свого боку гарантую, та додам скріншот`
    }
    \n Відправити на: ${selectedCity?.Present}, на ${
      selectedDivision?.Description
    }`;

    setOrderHasDone(true);

 
    sendOrderToBack({products: productsInBasket, tel: +contact.tel});

    
    return axios.post(API, {chat_id: CHAT_ID,parse_mode: 'html', text: data, })

// return
    
  };

  const totalPrice = () => {
    const value = productsInBasket.reduce((acc, product) => {
      acc += +product.price * +product.amount;
      return acc;
    }, 0);
    return value;
  };

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
      console.log(error.message);
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
      console.log(error.message);
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
        console.log(error.message);
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

  return (
    <>
      {!orderHasDone &&
      <div className="order">
      <p className="order_title">Оформлення замовлення</p>

      {/* <div className="order_client-wrapper">
        <label className="order_client-label">
          <input
            type="radio"
            name="customer_type"
            className="order_client-input"
            defaultChecked={true}
          />
          Я новий покупець
        </label>
        <label
          className="order_client-label order_client-label-disabled"
          style={{ cursor: ' not-allowed' }}
        >
          <input
            type="radio"
            name="customer_type"
            disabled={true}
            className="order_client-input"
          />
          Я постійний покупець
        </label>
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
              value={contact?.name}
              onChange={e =>
                setContact(ps => ({ ...ps, name: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="surname" className="order_client-data-label">
              Ваше призвіщє
            </label>
            <input
              type="text"
              className="order_client-data-input"
              id="surname"
              value={contact?.surname}
              onChange={e =>
                setContact(ps => ({ ...ps, surname: e.target.value }))
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="tel" className="order_client-data-label">
            Ваш номер телефону
          </label>
          <input
            type="number"
            className="order_client-data-input"
            id="tel"
            placeholder="+380..."
            value={contact?.tel}
            onChange={e => setContact(ps => ({ ...ps, tel: e.target.value }))}
          />
        </div>
      </div>

      <div className="order_data-title">1. ВАШЕ ЗАМОВЛЕННЯ</div>
      <div className="order_data-data">
        <button
          type="button"
          onClick={() => {
            back();
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
                src={item.bigImg}
                alt="logo"
                className="order_data-image"
              />{' '}
              <p className="order_data-name">{item.product}</p>
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
            </li>
          ))}

          <li key="totalPrice" className="order_data-summary">
            <p>{'Всього ' + totalPrice() + ' грн'}</p>
          </li>
        </ul>
      </div>

      <div className="order_data-title">2. ДОСТАВКА</div>

      <div className="order_delivery-type1-wrapper">
        <img
          className="order_delivery-type1-logo"
          src={nplogo}
          alt="Nova poshta"
        />
        <div className="order_delivery-type1-method-wrapper">
          <div className="order_delivery-type1-method1-wrapper">
            <input
              type="radio"
              name="delivery_type"
              className="order_delivery-input"
              defaultChecked={true}
              id="prepay"
              onClick={() => {
                setPayment('Передплата на картку');
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
                setPayment('Наложений платіж');
              }}
            />
            <label className="order_delivery-label" htmlFor="postpay">
              Наложений платіж
            </label>
          </div>
        </div>
      </div>

      <div className="order_delivery-choose">
        <div className="order_delivery-choose-wrapper">
          <label className="order_delivery-choose-label">
            Введіть місто доставки
          </label>

          {!selectedCity && (
            <input
              type="text"
              onChange={e => setCityInput(e.target.value)}
              className="order_delivery-choose-input"
            />
          )}

          {selectedCity && (
            <div className="order_delivery-choose-result-variant-wrapper">
              <img
                src={nplogo}
                alt="logo"
                className="order_delivery-choose-result-variant-image"
              />
              <p className="order_delivery-choose-result-variant-title">
                {selectedCity?.Present}
              </p>
              <DeleteForeverIcon
                htmlColor="#008000"
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
                  htmlColor="#008000"
                  onClick={() => {
                    removeDivision();
                  }}
                />
              </div>
            )}

            <div className="order_delivery-choose-result">
              {!selectedDivision && divisionsList && divisionInput && (
                // divisionsList.map((division, index) => (
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
            {/* <p type='button' className="order_delivery-summary-title">ЗАМОВИТИ</p> */}
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
    </div>}

{orderHasDone &&
<div className='order_done-wrapper'>

  <h2>Дякуємо за Ваше замовлення.</h2>
  <pre><h3>Замовлення розміщене</h3></pre>
  <pre>Його вартість замовлення складає {totalPrice()} грн.</pre>
  <pre>Оплата на картку Моно 5325 4523 2222 2222</pre>
  <pre>Після оплати просимо Вас підтвердити написавши нам в Телеграм і натиснути кнопку </pre>
  <button type='button' className='order_done-btn' onClick={()=>{orderConfirmedByClient()}}>ЗАМОВЛЕННЯ ОПЛАЧЕНЕ</button>
  <pre>Після цього ми підтверджуємо його оплату і направляємо Ваші дані на склад на відправку.</pre>
  <pre>Відправлення проводяться зі складу в будні дні з 9:00 до 18:00</pre>


</div>}



    </>
  );
};
