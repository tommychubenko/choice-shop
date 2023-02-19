// import { AppBar } from './AppBar';
import { MainPage } from './MainPage';
import { Route, Routes } from 'react-router';
// import { Filter } from './Filter';
import { ProductPage } from './ProductPage';
// import { Basket } from './Basket';
import { Admin } from './admin/Admin';
import { About } from './pages/About';
import { Components } from './pages/Components';
import { Usage } from './pages/Usage';
// import { Footer } from './Footer';
import { Diia } from './pages/Diia';
import { AddNewProduct } from './admin/AddNewItem';
import { CheckOrders } from './admin/CheckOrders';
import { UpdateItem } from './admin/UpdateItem';
import { SendAsObj } from './admin/SendAsObj';

export const App = () => {
  return (
    <div className='globalWrapper'>
      {/* <Basket />
      <AppBar /> */}
      <div className="main-page container">
        {/* <Filter /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="products/:id" element={<ProductPage />}>
            <Route path="about" element={<About />} />
            <Route path="components" element={<Components />} />
            <Route path="diia" element={<Diia />} />
            <Route path="usage" element={<Usage />} />
          </Route>

          <Route path="admin" element={<Admin />} >
            <Route path='addnew' element={<AddNewProduct/>} />
            <Route path='sendasobj' element={<SendAsObj/>} />
            <Route path='checkorders' element={<CheckOrders/>} />
            <Route path='updateitem' element={<UpdateItem/>} />
       
             </Route>
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
