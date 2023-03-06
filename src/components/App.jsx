import { AppBar } from './AppBar';
import { MainPage } from './MainPage';
import { Route, Routes } from 'react-router';
import { Filter } from './Filter';
import { ProductPage } from './ProductPage';
import { Basket } from './Basket';
import { Admin } from './admin/Admin';
import { About } from './pages/About';
import { Components } from './pages/Components';
import { Usage } from './pages/Usage';
import { Footer } from './Footer';
import { Diia } from './pages/Diia';
import { AddNewProduct } from './admin/AddNewItem';
import { CheckOrders } from './admin/CheckOrders';
import { UpdateItem } from './admin/UpdateItem';
import { SendAsObj } from './admin/SendAsObj';
import { Auth } from './auth/Auth';
import { useSelector } from 'react-redux';
import { Register } from './auth/Register';
import { UserPage } from './auth/UserPage';
import { AddAReview } from './pages/AddReview';
import { OrderDetails } from './OrderDetails';

export const App = () => {
  const user = useSelector(state => JSON.parse(state.user));

  return (
    <div className="globalWrapper">
      <AppBar />
      <div className="container" style={{padding: '150px 5px'}}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="auth" element={<Auth />} />
          <Route path="basket" element={<Basket />} />
          <Route path="order-details" element={<OrderDetails />} />
          <Route path="register" element={<Register />} />
          {user && <Route path="auth/userpage" element={<UserPage />} />}
          <Route path="products/:id" element={<ProductPage />}>
            <Route path="about" element={<About />} />
            <Route path="components" element={<Components />} />
            <Route path="diia" element={<Diia />} />
            <Route path="usage" element={<Usage />} />
            <Route path="addreview" element={<AddAReview />} />
          </Route>

          {user?.uid === process.env.REACT_APP_ADMIN && (
            <Route path="admin" element={<Admin />}>
              <Route path="addnew" element={<AddNewProduct />} />
              <Route path="sendasobj" element={<SendAsObj />} />
              <Route path="checkorders" element={<CheckOrders />} />
              <Route path="updateitem" element={<UpdateItem />} />
            </Route>
          )}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
