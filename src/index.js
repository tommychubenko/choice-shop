import { App } from 'components/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './style/css/main.css';
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


// const firebaseConfig = {
//   apiKey: "AIzaSyB_o5cY7IxH4ttuwNqBzUQwb7Idt744oG8",
//   authDomain: "choice-fc7b4.firebaseapp.com",
//   databaseURL: "https://choice-fc7b4-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "choice-fc7b4",
//   storageBucket: "choice-fc7b4.appspot.com",
//   messagingSenderId: "944979921198",
//   appId: "1:944979921198:web:333a8d35176d40511b12bf",
//   measurementId: "G-5G6F6Q64P6"
// };


// const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
// const storage = firebaseApp.storage();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
