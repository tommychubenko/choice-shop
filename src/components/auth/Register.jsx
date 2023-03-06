import googleLogo from '../../images/Google_2015_logo.png';
import { auth, googleProvider } from 'config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Notify } from 'notiflix';
import { Backdrop } from '@mui/material';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const password = useRef();
  const email = useRef();
  const passwordConfirm = useRef();

  const navigate = useNavigate();

  const onRegister = async () => {
    if (password.current.value !== passwordConfirm.current.value) {
      return Notify.failure('Паролі не співпадають');
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      Notify.success('Вітаємо з реєстрацією на сайті');
      navigate('/auth');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  const onLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Notify.success('Вхід успішний');
      navigate('/auth');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <Backdrop
      sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={e => {
        e.currentTarget === e.target && navigate(-1);
      }}
    >
      <div className="auth login_wrapper">
        <h2 className="login_title">Реєстрація</h2>
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
        <input
          type="password"
          placeholder="повторіть пароль"
          className="login_input"
          ref={passwordConfirm}
        />
        <button type="button" className="login_btn" onClick={onRegister}>
          Зареєструватись
        </button>
        <button className="login_google" onClick={onLoginWithGoogle}>
          Увійти за допомогою
          {<img src={googleLogo} alt="Google" style={{ width: '50px' }} />}
        </button>
        <p className="login_toregister">
          Є аккаунт? Тоді ви можете <Link to="/auth">увійти.</Link>
        </p>
      </div>
    </Backdrop>
  );
};
