import { ProductItem } from './ProductItem';
import { useSelector } from 'react-redux';
import { Filter } from './Filter';
import npfreead from '../images/ad-np-001.jpg';
import freeDeliveryPC from '../images/free-delivery-pc.png';
import freeDeliveryTABLET from '../images/free-delivery-tablet.png';
import freeDeliveryMOBILE from '../images/free-delivery-mobile.png';

export const MainPage = () => {
  const allProducts = useSelector(state => state.products);
  const findWord = useSelector(state => state.find);
  const selectedBrands = useSelector(state => state.filter.brands);
  const selectedGroups = useSelector(state => state.filter.groups);
  const selectedUsage = useSelector(state => state.filter.usage);
  const selectedProgram = useSelector(state => state.filter.program);

  const minPrice = useSelector(state => state.filter.minprice);
  const maxPrice = useSelector(state => state.filter.maxprice);

  // const topSellersAndAds = () => {

  //   let finalRender = [...allProducts].filter(product => product.top).map(product => (
  //     <ProductItem product={product} key={product.cid} />
  //   ));

  //   return (
  //     <>
  //     <img className='freedelivery_pc' src={freeDeliveryPC} alt="безкоштовна доставка"/>
  //     <img className='freedelivery_tablet' src={freeDeliveryTABLET} alt="безкоштовна доставка"/>
  //     <img className='freedelivery_mobile' src={freeDeliveryMOBILE} alt="безкоштовна доставка"/>
  //     {finalRender}
  //     </>
  //   );
  // };

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

    if (selectedUsage.length > 0) {
      finalRender = finalRender.filter(
        product => selectedUsage === product.zastosuvannya
      );
    }

    if (selectedProgram.length > 0) {

    finalRender =  finalRender.filter(product => product?.programma.includes(selectedProgram)) 
    
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
          <div className="discount_freeDelivery">
            <p>АКЦІЯ! <br/>
            Доставка передплачених замовлень від 500 грн до відділення Нової Пошти - БЕЗКОШТОВНЕ</p>
          </div>
          {finalRender}
        </>
      );
    }

    if (finalRender.length === 0) {
      return 'Товари за такими данними не знайдені';
    }

    return finalRender;
  };

  return (
    <div className="main-page">
      <div className="filter_pc">
        <Filter />
      </div>
      <div className="main-page_markup">{renderProducts()}</div>
    </div>
  );
};
