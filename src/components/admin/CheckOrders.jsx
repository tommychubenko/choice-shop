import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { getOrders } from 'redux/api';
import {months} from './libruary'
import { db } from 'config/firebase';
import { setAllProductsToState } from 'redux/slices';
import { Notify } from 'notiflix';
import Switch from '@mui/material/Switch';


export const CheckOrders = () => {
  const [orders, setOrders] = useState();
  const allOrders = useRef();
  const ordersRef = collection(db, 'orders');

  const getAllOrdersFromFireStore = async () => {
    try {
      const data = await getDocs(ordersRef);
      const filtredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrders(filtredData)
     
    } catch (error) {
      Notify.failure('Не зміг завантажити замовлення');
    }
  };

  const deleteOrderFromFireStore = async (id) => {  
    const ordersDoc = doc(db, 'orders', id)

    try {
      await deleteDoc(ordersDoc);
      Notify.success('Замовлення успішно видалено');
      getAllOrdersFromFireStore()
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  const updateOrderFromFireStore = async (id, data) => {  
    const ordersDoc = doc(db, 'orders', id)
    try {
      await updateDoc(ordersDoc, {payed: data});
      Notify.success('Замовлення успішно виправлено');
      getAllOrdersFromFireStore()
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  useEffect(() => {
      getAllOrdersFromFireStore();
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
        Всі замовлення +
      </h3>
      {orders && (
        <table className="admin_orders-list" ref={allOrders}>
<thead>
            <tr>
              <th>Отримано</th>
              <th>Клієнт</th>
              <th>Товари</th>
              <th>Сума</th>
              {/* <th>Оплата?</th> */}
              <th>Оплачено?</th>
              <th>Видалити</th>

            </tr></thead>

            <tbody>
            {orders.map(order => (
            
              <tr key={order?.id}>
                <td>{timeConverter(order?.date)}</td>
                <td>{order?.contact.email}</td>
                <td>
                  {/* {order?.products?.lengtd} */}
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
                {/* <td>{order?.payed ? <p style={{color: 'green'}}>Оплачено</p>: <p style={{color: 'red'}}>Неоплачено</p>} </td> */}
                <td><Switch checked={order?.payed} onChange={(e)=>{updateOrderFromFireStore(order?.id, e.target.checked )}}/></td>
                <td><button onClick={()=>{deleteOrderFromFireStore(order?.id)}} style={{cursor: 'pointer'}}>видалити</button></td>
              </tr>
              
            ))}
            </tbody>
        </table>
      )}
    </>
  );
};
