import {useRef} from 'react';
import { auth, googleProvider } from '../../config/firebase';
import {
  signOut} from 'firebase/auth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {useSelector } from 'react-redux';
import { Backdrop } from '@mui/material';
import {useNavigate } from 'react-router';

import { Login } from './Login';
import { User } from './User';

export const Auth = () => {
  const password = useRef();
  const email = useRef();
  const navigate = useNavigate();
  const user = useSelector(state => JSON.parse(state.user))

 

  const onSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <>
   
      <Backdrop
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={e => {
          e.currentTarget === e.target && navigate('/');
        }}
      >
        <div className="auth">
         {!user && <Login/>}
         {user && <User/>}

        
        </div>
      </Backdrop>
    </>
  );
};
