import { useEffect, useRef, useState } from 'react';
import { getOrders } from 'redux/api';
import {months} from './libruary'

export const CheckOrders = () => {
  const [orders, setOrders] = useState();
  const allOrders = useRef();

  useEffect(() => {
    getOrders()
      .then(r => setOrders(r.data))
      .catch(e => console.log(e));
  }, []);


  function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);    
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  return (
    <>
        <h3
        className="admin_orders-title"
        // onClick={() => {
        //   allOrders.current.classList.toggle('scale');
        // }}
      >
        Всі замовлення +{' '}
      </h3>
      {orders && (
        <table className="admin_orders-list" ref={allOrders}>
          <thead>
            <tr>
              <th>Отримано</th>
              <th>Клієнт</th>
              <th>Товари</th>
              <th>Сума</th>
              <th>Оплачено</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order?.id}>
                <td>{timeConverter(order?.createdAt)}</td>
                {order?.tel}
                <td>
                  {/* {order?.products?.length} */}
                  {order?.products.reduce((acc, item) => {
                    acc += +item.amount;
                    return acc;
                  }, 0)}
                </td>
                <td>
                  {order.products.reduce((acc, item) => {
                    acc += +item.price * item.amount;
                    return acc;
                  }, 0)}
                </td>
                <td>{order.payed ? 'Оплачено' : 'Не оплачено'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
