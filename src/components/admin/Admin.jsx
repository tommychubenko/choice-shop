import { OutletLink } from 'components/App.styled';
import { Outlet } from 'react-router';

export const Admin = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap:'5px' }}>
        <OutletLink to={'addnew'}>Додати новий продукт</OutletLink>
        <OutletLink to={'sendasobj'}>Додати новий продукт об'єктом</OutletLink>
        <OutletLink to={'checkorders'}>Перевірити замовлення</OutletLink>
        <OutletLink to={'updateitem'}>Змінити продукт</OutletLink>
      </div>

      <Outlet />
    </div>
  );
};
