import { ProductItem } from './ProductItem';
import { useSelector } from 'react-redux';
import { Filter } from './Filter';
import npfreead from '../images/ad-np-001.jpg';

export const MainPage = () => {
  const allProducts = useSelector(state => state.products);
  const findWord = useSelector(state => state.find);
  const selectedBrands = useSelector(state => state.filter.brands);
  const selectedGroups = useSelector(state => state.filter.groups);
  const minPrice = useSelector(state => state.filter.minprice);
  const maxPrice = useSelector(state => state.filter.maxprice);

  const topSellersAndAds = () => {
    let finalRender = [...allProducts].filter(product => product.top).map(product => (
      <ProductItem product={product} key={product.cid} />
    ));  
    

    return (
      <>     
       {finalRender}
      </>
    );
  };

  const renderProducts = () => {
    let finalRender = [...allProducts];

    if (findWord !== '') {
      finalRender = finalRender.filter(product =>
        product.product.toLowerCase().includes(findWord.toLowerCase())
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
      minPrice === 0 &&
      maxPrice === 0
    ) {
      return topSellersAndAds();
    }

    if (finalRender.length === 0) {
      return 'Товари за такими данними не знайдені';
    }

    return finalRender;
  };

  return (
    <div className="main-page">
      <div className='filter_pc'><Filter /></div>
      <div className="main-page_markup">{renderProducts()}</div>
    </div>
  );
};
