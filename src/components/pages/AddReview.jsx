import { Rating } from '@mui/material';
import { db } from 'config/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Notify } from 'notiflix';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export const AddAReview = () => {
  const [value, setValue] = useState(5);
  const { id } = useParams();
  const reviewsFromRedux = useSelector(store => store.reviews);
  const reviews = reviewsFromRedux.filter(review => review.cid === +id);
  const user = useSelector(state => JSON.parse(state.user));

  const isUserWroteReview = reviews?.some(review => review?.uid == user?.uid);

  const name = useRef();
  const text = useRef();
  const reviewsRef = collection(db, 'reviews');

  const addNewReviewToFireStore = async review => {
    try {
      await addDoc(reviewsRef, review);
      Notify.success('Відгук успішно успішно відправлено');
      name.current.value = '';
      text.current.value = '';
    } catch (error) {
      Notify.failure(error.message);
    }
  };


  // Завантажити виправлний товар

  const onSubmit = e => {
    e.preventDefault();

 
    let result = 
      {
        name: name.current.value,
        date: Date.now(),
        text: text.current.value,
        rating: value,
        uid: user?.uid,
        cid: +id
      }
    
    addNewReviewToFireStore(result);
    return;
  };

  return (
    <>
      {!user && (
        <div>
          <h4>Тільки зареєстровані користувачі можуть залишати відгуки</h4>
        </div>
      )}
      {user && !isUserWroteReview && (
        <form
          onSubmit={e => {
            onSubmit(e);
          }}
          className="newReview_form"
        >
          <input
            type="text"
            name="name"
            placeholder="Ваше ім'я"
            className="newReview_name"
            ref={name}
            required
          />
          <Rating
            value={value}
            precision={0.5}
            onChange={(event, newValue) => setValue(newValue)}
            className="newReview_rating"
          />
          <textarea
            ref={text}
            type="text"
            placeholder="Ваш відгук..."
            className="newReview_text"
            required
          />
          <button className="newReview_btn" type="submit">
            Додати відгук
          </button>
        </form>
      )}

      {user && isUserWroteReview && (
        <p>
          Ви вже написали відгук по даному товару, можливість редагування вже
          написаного відгуку буде реалізована в найближчих релізах
        </p>
      )}
    </>
  );
};
