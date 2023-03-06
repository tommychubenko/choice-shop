import { useRef } from 'react';
import { addNewProductToFireStore } from './adminFunctions';

export const SendAsObj = () => {
  const sendArray = useRef();
  const inputDataRef = useRef();

  const onSubmitObj = e => {
    e.preventDefault();
    const pasedValue = JSON.parse(inputDataRef.current.value)
    pasedValue.forEach(obj => addNewProductToFireStore(obj) )
    e.currentTarget.reset();
  };

  return (
    <>
      <h3>Відправити об'єктом</h3>
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
          ref={inputDataRef}
          defaultValue={`[]`}
        ></textarea>
        <button type="submit" style={{ cursor: 'pointer' }}>
          Відправити
        </button>
      </form>
    </>
  );
};
