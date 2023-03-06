import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { Notify } from 'notiflix';

export const Reviews = ({ id }) => {
  const reviewsFromRedux = useSelector(store => store.reviews);
  const user = useSelector(state => JSON.parse(state.user));
  const reviews = reviewsFromRedux.filter(review => review.cid === +id);
  const rating =
    reviews?.reduce((acc, review) => {
      acc += review?.rating;
      return acc;
    }, 0) / reviews?.length;

   const deleteReviewFromFireStore = async (id) => {  
    const reviewDoc = doc(db, 'reviews', id)

    try {
      await deleteDoc(reviewDoc);
      Notify.success('Відгук успішно видалено');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <div className="reviews">
      <div className="reviews_top-wrapper">
        <Rating value={rating} precision={0.5} readOnly />
        {<p>{reviews?.length} відгуків</p>}
      </div>

      <h2 className="reviews_title"> Відгуки про товар</h2>

      <div className="reviews_wrapper">
        {reviews.length > 0 && (
          <ul className="reviews_list">
            {reviews?.map(review => (
              <li key={review?.date} className="reviews_item">
                <div className="reviews_item-data">
                  <Rating
                    size="small"
                    value={review?.rating}
                    precision={0.5}
                    readOnly
                  />
                  <p className="reviews_name">{review?.name}</p>
                </div>
                <p className="reviews_text">
                  {review?.text}
                  {user?.uid === process.env.REACT_APP_ADMIN && (
                    <button type="button" onClick={()=>{deleteReviewFromFireStore(review.id)}} style={{cursor: 'pointer'}}>delete</button>
                  )}{' '}
                </p>
              </li>
            ))}
          </ul>
        )}

        {reviews.length === 0 && (
          <p className="reviews_empty">Ви можете додати перший відгук...</p>
        )}
      </div>
    </div>
  );
};
