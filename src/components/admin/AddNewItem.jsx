import { useRef } from 'react';
import { sendItem } from 'redux/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { groups, subbrands } from './libruary';

export const AddNewProduct = () => {
  const sendNew = useRef();


  const onSubmit = e => {
    e.preventDefault();
    const inputData = [...e.currentTarget.children];
    const result = {};

    inputData.forEach(item => {
      const input = item.childNodes[0];
      if (item.nodeName !== 'BUTTON') {
        if (input.value === 'Так') {
          return (result[`${input.name}`] = true);
        } else if (input.value === 'Ні') {
          return (result[`${input.name}`] = false);
        } else if (input.value.includes('+')) {
          return (result[`${input.name}`] = input.value.split('+'));
        }
        result[input.name] = input.value;
      }
    });

    sendItem(result);
    console.log(result);
    sendNew.current.reset();
    Notify.success('Товар успішно доданий');
  };



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

      <datalist id="boolean">
        <option value={'Так'}></option>
        <option value={'Ні'}></option>
      </datalist>

      <div className="sendnew">
        <h3
          className="sendnew_title"
          // onClick={() => {
          //   sendNew.current.classList.toggle('scale');
          // }}
        >
          Відправити новий продукт +
        </h3>

        <div className="sendnew_body">
          <form
            // className="send_form"
            onSubmit={e => {
              onSubmit(e);
            }}
            ref={sendNew}
          >
            <label className="send_title">
              <input type="number" name="cid" className="send_input" />
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
              />
              Суббренд
            </label>

            <label className="send_title">
              <input
                type="text"
                name="group"
                className="send_input"
                list="groups"
              />
              Група
            </label>
            <label className="send_title">
              <input type="text" name="product" className="send_input" />
              Назва
            </label>
            <label className="send_title">
              <input type="text" name="zastosuvannya" className="send_input" />
              Застосування
            </label>
            <label className="send_title">
              <input type="text" name="programma" className="send_input" />
              Програма, якщо декілька програм, ставити +
            </label>

            <label className="send_title">
              <textarea
                type="text"
                rows="10"
                name="benefits"
                className="send_input"
              />
              Переваги, через +
            </label>

            <label className="send_title">
              <textarea
                rows="10"
                type="text"
                name="about"
                className="send_input"
              />
              Про товар, одним реченням. Без +
            </label>
            <label className="send_title">
              <textarea
                rows="10"
                type="text"
                name="components"
                className="send_input"
              />
              Компоненти, через +
            </label>

            <label className="send_title">
              <textarea
                rows="10"
                type="text"
                name="diia"
                className="send_input"
              />
              дія компексів, через +
            </label>

            <label className="send_title">
              <textarea
                rows="10"
                type="text"
                name="usage"
                className="send_input"
              />
              Використання, через +
            </label>

            <label className="send_title">
              <input type="text" name="smallImg" className="send_input" />
              маленьке зображення
            </label>
            <label className="send_title">
              <input type="text" name="bigImg" className="send_input" />
              велике зображення
            </label>
            <label className="send_title">
              <input type="text" name="videoLink" className="send_input" />
              Лінк на відео
            </label>
            <label className="send_title">
              <input type="text" name="myprice" className="send_input" />
              Ціна оптова
            </label>
            <label className="send_title">
              <input type="text" name="price" className="send_input" />
              Ціна роздрібна
            </label>
            <label className="send_title">
              <input
                type="text"
                name="top"
                className="send_input"
                defaultValue={'Ні'}
                list={'boolean'}
              />
              В топі?
            </label>
            <label className="send_title">
              <input
                type="text"
                name="inStock"
                list={'boolean'}
                defaultValue={'Так'}
                className="send_input"
              />
              В наявності?
            </label>

            <button type="submit" className="send_btn">
              Підтвердити і відіслати
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
