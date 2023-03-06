import { db } from 'config/firebase';
import {collection, addDoc} from 'firebase/firestore';
import { Notify } from 'notiflix';

const productsRef = collection(db, 'products');
const ordersRef = collection(db, 'orders');
// const reviewsRef = collection(db, 'reviews');

// Додати новий продукт

export const addNewProductToFireStore = async product => {
  try {
    await addDoc(productsRef, product);
    Notify.success('Товар успішно доданий');
  } catch (error) {
    Notify.failure(error.message);
  }
};

// Додати нове замовлення

export const addNewOrderToFireStore = async order => {
  try {
    await addDoc(ordersRef, order);
    Notify.success('Замовлення успішно відправлено');
  } catch (error) {
    Notify.failure(error.message);
  }
};

// export const addNewReviewToFireStore = async review => {
//   try {
//     await addDoc(reviewsRef, review);
//     Notify.success('Відгук успішно успішно відправлено');
//   } catch (error) {
//     Notify.failure(error.message);
//   }
// };

export const monoCardHref = "https://send.monobank.ua/9BwCC7cCZ5"
