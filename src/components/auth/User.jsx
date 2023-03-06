import { BackBtn, OutletLink } from 'components/App.styled';
import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';
import { Notify } from 'notiflix';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import blankUser from '../../images/blank-user.png'

export const User = () => {
  const navigate = useNavigate();
  const user = useSelector(state => JSON.parse(state.user));

  const onSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <div className='user_wrapper'>
        <h2 className="user_title">Ваш аккаунт</h2>
        <p className='user_greeting'>{user?.displayName || user?.email}</p>

      <img className='user_photo' src={user?.photoURL ?? blankUser} alt="user" />
      <OutletLink to={'userpage'} style={{marginBottom : '15px'}}>Деталі аккаунту</OutletLink>
     {user?.uid === process.env.REACT_APP_ADMIN && <OutletLink to={'/admin'} style={{marginBottom : '15px'}}>Зона адміністратора</OutletLink>}
      <button className='user_exit' onClick={onSignOut}>Вийти</button>
    </div>
  );
};
