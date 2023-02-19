import { useRef } from "react";
import { sendItem } from "redux/api";

export const SendAsObj = () => {

    const sendArray = useRef();
  const onSubmitObj = e => {
    e.preventDefault();
    const array = JSON.parse(e.currentTarget[0].value);

    let time = 1000;
    for (let i = 0; i < array.length; i++) {
      setTimeout(() => {
        sendItem(array[i]).then();
        console.log(array[i]);
      }, time);
      time += 1000;
    }

    e.currentTarget.reset();
  };

  return (
    <>
      <h3

      >
        Відправити об'єктом
      </h3>
      <form

        ref={sendArray}
        onSubmit={e => {
          onSubmitObj(e);
        }}
      >
        <textarea
          style={{ border: '1px solid #000000', width: '100%' }}
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit" style={{ cursor: 'pointer' }}>
          Відправити
        </button>
      </form>
    </>
  );
};
