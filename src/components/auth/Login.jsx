import googleLogo from '../../images/Google_2015_logo.png';
import { auth, googleProvider } from 'config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Notify } from 'notiflix';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const password = useRef();
  const email = useRef();

  const onLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Notify.success('Вхід успішний');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  const onLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      Notify.success('Вхід успішний');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <div className="login_wrapper">
      <h2 className="login_title">Вхід</h2>
      <input
        type="email"
        placeholder="email"
        className="login_input"
        ref={email}
      />
      <input
        type="password"
        placeholder="пароль"
        className="login_input"
        ref={password}
      />
      <button type="button" className="login_btn" onClick={onLogin}>
        Вхід
      </button>
      <button className="login_google" onClick={onLoginWithGoogle}>
        Увійти за допомогою{' '}
        {<img src={googleLogo} alt="Google" style={{ width: '50px' }} />}
      </button>
      <p className="login_toregister">
        Щє немає аккаунту? Тоді ви можете{' '}
        <Link to="/register">зареєструватись.</Link>
      </p>
    </div>
  );
};
