import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import AddchartIcon from '@mui/icons-material/Addchart';
import { AddTask } from '@mui/icons-material';

export const Components = () => {
  const [product, setProduct] = useState();
  const allProducts = useSelector(state => state.products);
  const { id } = useParams();

  useEffect(() => {
    const product = allProducts.filter(product => +product.cid === +id);
    setProduct(product);
  }, [allProducts, id]);

  return (
    product &&
    (typeof product[0]?.components !== 'string' ? (
      <ul className="components_list">
        {product &&
          product[0]?.components.map((component, index) => (
            <li className="components_item" key={index}>
              <AddTask className="global-color" /> {component}
            </li>
          ))}
      </ul>
    ) : (
      <p>{product[0]?.components}</p>
    ))
  );
};
