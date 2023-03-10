import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import AddchartIcon from '@mui/icons-material/Addchart';

export const Usage = () => {

    const [product, setProduct] = useState();

    const allProducts = useSelector(state => state.products);
    const {id} = useParams();

    useEffect(()=>{     
       const product = allProducts.filter(product => +product.cid === +id);
       setProduct(product); 

    },[allProducts, id])
    return product && (
    typeof product[0].usage !== 'string' ? 
    <ul className="usage_list"> {product[0]?.usage.map((usage, index) => <li className="usage_item" key={index}><AddchartIcon className="global-color"/>{usage}</li>) }</ul>
  
    : 
    <p className="usage_item"><AddchartIcon className="global-color"/> {product[0]?.usage}</p> 
    
  )
}