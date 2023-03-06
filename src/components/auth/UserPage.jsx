import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'config/firebase';
import { Notify } from 'notiflix';
import { useSelector } from 'react-redux';
import { months } from 'components/admin/libruary';
import {useNavigate } from 'react-router';
import { monoCardHref } from 'components/admin/adminFunctions';

export const UserPage = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = useSelector(state => JSON.parse(state.user));
  const ordersRef = collection(db, 'orders');
  const navigate = useNavigate();

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

  const getAllOrdersFromFireStore = async () => {
    try {
      const data = await getDocs(ordersRef);
      const filtredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      const userData = filtredData.filter(order => order.uid === user.uid);
      setUserOrders(userData);
    } catch (error) {
      Notify.failure('Не зміг завантажити замовлення');
    }
  };

  useEffect(() => {
    getAllOrdersFromFireStore();
  }, []);

  return (
    <div className="userpage">
      <h2 className="userpage_title">Ваші замовлення</h2>

      {userOrders.length === 0 && (
        <h3>Ви поки не зробили жодного замовлення</h3>
      )}

      {userOrders.length > 0 &&
        userOrders.map(({ products, id, date, payed }) => (
          <Accordion key={id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {' '}
              <p>
                {' '}
                Замовлення № {date} від {timeConverter(date)}
              </p>{' '}
              {payed ? (
                <p style={{ color: 'green', marginLeft: 'auto' }}> Оплачено</p>
              ) : (
                <p style={{ color: 'red', marginLeft: 'auto' }}> Не оплачено</p>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <ButtonGroup
            //   classes='global-color'
                variant="outlined"
                aria-label="outlined primary button group"
                style={{marginBottom: "20px"}}
              >
               <Button onClick={()=> window.open(monoCardHref, "_blank")}>Оплатити</Button>
                {/* <Button>Two</Button>
                <Button>Three</Button> */}
              </ButtonGroup>


              <table className="userpage_order-list">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Назва</th>
                    <th>Кількість</th>
                    <th>Вартість</th>
                    <th>Всього</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(({ product, amount, price, cid }, index) => (
                    <tr key={cid}>
                      <td>{index + 1}</td>
                      <td>{product}</td>
                      <td>{amount}</td>
                      <td>{price}</td>
                      <td>{price * amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <ul>{products.map(product => <li key={product?.cid}>{product?.product} {product?.amount + 'шт'} </li>)}</ul> */}
            </AccordionDetails>
          </Accordion>
        ))}

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}

      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
};
