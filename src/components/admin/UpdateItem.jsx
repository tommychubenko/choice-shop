import { useRef, useState } from 'react';
import { Notify } from 'notiflix';
import { groups, subbrands } from './libruary';
import { useSelector } from 'react-redux';
import { db } from 'config/firebase';
import {updateDoc, doc} from 'firebase/firestore';


export const UpdateItem = () => {
  const [exactProduct, setExactProduct] = useState([]);

  const allProducts = useSelector(state => state.products);
  const sendfix = useRef();
  const inputid = useRef();

const updateProductToFireStore = async product => {
  const productDoc = doc(db, 'products', product.id)

    try {
      await updateDoc(productDoc, product );
      Notify.success('Товар успішно змінений');
      setExactProduct([])
      inputid.current.value = ''

    } catch (error) {
      Notify.failure(error.message); 
    }
  };
  

  // Перевірка чи ID введений (не пустий)
  function getDataFromId(e) {
    e.preventDefault();
    inputid.current.value.length > 0
      ? getExactProduct(+inputid.current.value)
      : Notify.failure('Введіть номер ID');
  }

  function getExactProduct(cid) {
    const result = allProducts.filter(product => +product.cid === +cid);
 

    if (result.length > 0) {
      setExactProduct(result);
      sendfix?.current?.reset();
      Notify.success('Товар знайдений, дані завантажені');
      return;
    } else {
      Notify.failure('Товар не знайдений, дані не завантажені');
    }  
  }

  // Завантажити виправлний товар 

  const onSubmit = e => {
    e.preventDefault();
    const inputData = [...e.currentTarget.children];
    const result = {};

    inputData.forEach(item => {
      const input = item.childNodes[0];
      if (item.nodeName !== 'BUTTON') {
        if (input.type === 'checkbox') {
          return (result[`${input.name}`] = input.checked);
        }
        if (input.type === 'number') {
          return (result[`${input.name}`] = input.valueAsNumber);
        } else if (input.value.includes('+')) {
          return (result[`${input.name}`] = input.value.split('+'));
        } 
        result[input.name] = input.value;
      }
    });
    return  updateProductToFireStore(result, result.id)
  };

  const getStringOrArray = (data) =>  typeof data === "string" ? data : data.join('+')
  



  return (
    <>
      {
        <datalist id="subbrands">
          {subbrands.map(subbrand => (
            <option value={subbrand} key={subbrands.indexOf(subbrand)}></option>
          ))}
        </datalist>
      }

      {
        <datalist id="groups">
          {groups.map(group => (
            <option value={group} key={100 + groups.indexOf(group)}></option>
          ))}
        </datalist>
      }

    
      <div className="sendnew">
        <h3
          className="sendnew_title"
          onClick={() => {
            sendfix.current.classList.toggle('scale');
          }}
        >
          Виправити продукт +
        </h3>
        <form
          onSubmit={e => {
            getDataFromId(e);
          }}
          className="send_form scale"
        >
          <label className="send_title">
            <input
              type="number"
              name="id"
              className="send_input"
              required={true}
              ref={inputid}
            />
            СID Пошуку товару
          </label>
          <button type="submit" className="getexact_btn">
            Підвантажити дані
          </button>
        </form>
        {exactProduct.length === 1 && (
          <div className="sendnew_body">
            <form
              className="send_form scale"
              onSubmit={e => {
                onSubmit(e);
              }}
              ref={sendfix}
            >
              <label className="send_title">
                <input
                  type="text"
                  name="id"
                  className="send_input"
                  required={true}
                  value={exactProduct[0]?.id}
                  disabled={true}
                />
                ID
              </label>

              <label className="send_title">
                <input
                  type="number"
                  name="сid"
                  className="send_input"
                  required={true}
                  defaultValue={exactProduct[0]?.cid}
                />
                CID
              </label>

              <label className="send_title">
                <input
                  type="text"
                  name="type"
                  defaultValue="biofito"
                  className="send_input"
                />
                Група товарів (за замовченням Biofito)
              </label>
              <label className="send_title">
                <input
                  type="text"
                  name="brand"
                  className="send_input"
                  defaultValue="Choice"
                />
                Бренд
              </label>
              <label className="send_title">
                <input
                  type="text"
                  name="subbrand"
                  className="send_input"
                  list="subbrands"
                  defaultValue={exactProduct[0]?.subbrand}
                />
                Суббренд
              </label>

              <label className="send_title">
                <input
                  type="text"
                  name="group"
                  className="send_input"
                  list="groups"
                  defaultValue={exactProduct[0]?.group}
                />
                Група
              </label>
              <label className="send_title">
                <input
                  type="text"
                  name="product"
                  className="send_input"
                  defaultValue={exactProduct[0]?.product}
                />
                Назва
              </label>
              <label className="send_title">
                <input
                  type="text"
                  name="zastosuvannya"
                  className="send_input"
                  defaultValue={
                    getStringOrArray(exactProduct[0]?.zastosuvannya)
                    }
                />
                Застосування
              </label>
              <label className="send_title">
                <input
                  type="text"
                  name="programma"
                  className="send_input"
                  defaultValue={
                    getStringOrArray(exactProduct[0]?.programma)
                    }
                />
                Програма, якщо декілька програм, ставити +
              </label>

              <label className="send_title">
                <textarea
                  rows="10"
                  type="text"
                  name="benefits"
                  className="send_input"
                  defaultValue={
                  getStringOrArray(exactProduct[0]?.benefits)
                  }
                />
                Переваги, через +
              </label>

              <label className="send_title">
                <textarea
                  rows="10"
                  type="text"
                  name="about"
                  className="send_input"
                  defaultValue={
                    getStringOrArray(exactProduct[0]?.about)
                    }
                />
                Про товар
              </label>
              <label className="send_title">
                <textarea
                  rows="10"
                  type="text"
                  name="components"
                  className="send_input"
                  defaultValue={
                    getStringOrArray(exactProduct[0]?.components)
                    }
                />
                Компоненти, через +
              </label>

              <label className="send_title">
                <textarea
                  rows="10"
                  type="text"
                  name="diia"
                  className="send_input"
                  defaultValue={
                    getStringOrArray(exactProduct[0]?.diia)
                    }
                />
                дія компексів, через +
              </label>

              <label className="send_title">
                <textarea
                  rows="10"
                  type="text"
                  name="usage"
                  className="send_input"
                  defaultValue={
                    getStringOrArray(exactProduct[0]?.usage)
                    }
                />
                Використання, через +
              </label>

              <label className="send_title">
                <input
                  type="text"
                  name="smallImg"
                  className="send_input"
                  defaultValue={exactProduct[0]?.smallImg}
                />
                маленьке зображення
              </label>
              <label className="send_title">
                <input
                  type="text"
                  name="bigImg"
                  className="send_input"
                  defaultValue={exactProduct[0]?.bigImg}
                />
                велике зображення
              </label>
              <label className="send_title">
                <input
                  type="text"
                  name="videoLink"
                  className="send_input"
                  defaultValue={exactProduct[0]?.videolink}
                />
                Лінк на відео
              </label>
              <label className="send_title">
                <input
                  type="number"
                  name="myprice"
                  className="send_input"
                  defaultValue={exactProduct[0]?.myprice}
                  required
                />
                Ціна оптова
              </label>
              <label className="send_title">
                <input
                  type="number"
                  name="price"
                  className="send_input"
                  defaultValue={exactProduct[0]?.price}
                  required
                />
                Ціна роздрібна
              </label>
              <label className="send_title">
                <input
                   type="checkbox"
                  name="top"
                  className="send_input"
                  defaultChecked={exactProduct[0]?.top}
                
                />
                В топі?
              </label>
              <label className="send_title">
                <input
                  type="checkbox"
                  name="inStock"
                  defaultChecked={exactProduct[0]?.inStock}
                  className="send_input"
                />
                В наявності?
              </label>

              <button type="submit" className="send_btn">
                Підтвердити і відіслати
              </button>
            </form>{' '}
          </div>
        )}
      </div>
    </>
  );
};
