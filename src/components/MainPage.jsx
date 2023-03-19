import { ProductItem } from './ProductItem';
import { useSelector } from 'react-redux';
import { Filter } from './Filter';
import npfreead from '../images/ad-np-001.jpg';
import freeDeliveryPC from '../images/free-delivery-pc.png';
import freeDeliveryTABLET from '../images/free-delivery-tablet.png';
import freeDeliveryMOBILE from '../images/free-delivery-mobile.png';
import { Skeleton } from '@mui/material';
import { IndexPage } from './pages/IndexPage';

export const MainPage = () => {
  const allProducts = useSelector(state => state.products);
  const findWord = useSelector(state => state.find);
  const selectedBrands = useSelector(state => state.filter.brands);
  const selectedGroups = useSelector(state => state.filter.groups);
  const selectedUsage = useSelector(state => state.filter.usage);
  const selectedProgram = useSelector(state => state.filter.program);

  const minPrice = useSelector(state => state.filter.minprice);
  const maxPrice = useSelector(state => state.filter.maxprice);

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width={300}
          height={400}
        />
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width={300}
          height={400}
        />
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width={300}
          height={400}
        />
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width={300}
          height={400}
        />
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width={300}
          height={400}
        />
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width={300}
          height={400}
        />
      </>
    );
  };

  const renderFreeDevivety = () => (
    <div className="discount_freeDelivery">
      <p>
        АКЦІЯ! <br />
        Доставка передплачених замовлень від 500 грн до відділення Нової Пошти -
        БЕЗКОШТОВНЕ
      </p>
    </div>
  );

  const topSellersAndAds = () => {
    let finalRender = [...allProducts]
      .filter(product => product.top)
      .map(product => <ProductItem product={product} key={product.cid} />);

    return (
      <>
        {renderFreeDevivety()}
        {finalRender}
      </>
    );
  };

  const renderProducts = () => {
    let finalRender = [...allProducts];

    if (findWord !== '') {
      finalRender = finalRender.filter(
        product =>
          product.product.toLowerCase().includes(findWord.toLowerCase()) ||
          product.subbrand.toLowerCase().includes(findWord.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      finalRender = finalRender.filter(
        product => selectedBrands === product.subbrand
      );
    }
    if (selectedGroups.length > 0) {
      finalRender = finalRender.filter(
        product => selectedGroups === product.group
      );
    }

    if (selectedUsage.length > 0) {
      finalRender = finalRender.filter(
        product => selectedUsage === product.zastosuvannya
      );
    }

    if (selectedProgram.length > 0) {
      finalRender = finalRender.filter(product =>
        product?.programma.includes(selectedProgram)
      );
    }

    if (minPrice > 0) {
      finalRender = finalRender.filter(product => product.price > minPrice);
    }
    if (maxPrice > 0) {
      finalRender = finalRender.filter(product => product.price < maxPrice);
    }

    finalRender = finalRender.map(product => (
      <ProductItem product={product} key={product.cid} />
    ));

    //  return findWord !== '' || selectedBrands.length > 0 || selectedGroups.length > 0 ?
    //   finalRender :  topSellersAndAds()

    if (
      findWord === '' &&
      selectedBrands.length === 0 &&
      selectedGroups.length === 0 &&
      selectedProgram.length === 0 &&
      selectedUsage.length === 0 &&
      minPrice === 0 &&
      maxPrice === 0
    ) {
      return (
        <>
          {/* <IndexPage/> */}
          {finalRender}
        </>
      );
    }

    if (finalRender.length === 0) {
      return (
        <p className="main-page_noproducts">
          Нажаль ми ніого не знайшли за Вашим запитом <b>{findWord}</b>
        </p>
      );
    }

    return finalRender;
  };

  // const createSiteMap = () => {
  //   const r = allProducts.map(item =>`<url><loc>https://eco-shop.org.ua/products/${item?.cid}</loc><lastmod>2023-03-10T17:54:28+00:00</lastmod></url>`).join('')
  //   console.dir(r);
  // }

  // createSiteMap()

  return (
    <>
      {' '}
      <p className="logo_text">
        Доставка передплачених замовлень від 500 грн до відділення Нової Пошти -
        БЕЗКОШТОВНА
      </p>
      <div className="main-page">
        <div className="filter_pc">
          <Filter place={'mainpage'} />
        </div>

        <div className="main-page_markup">
          {allProducts.length > 0 ? renderProducts() : renderSkeleton()}
        </div>
      </div>
    </>
  );
};
