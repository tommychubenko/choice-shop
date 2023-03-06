import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddchartIcon from '@mui/icons-material/Addchart';

export const About = () => {
    const [product, setProduct] = useState();
    const allProducts = useSelector(state => state.products);
    const {id} = useParams();

    

    useEffect(()=>{     
        const product = allProducts.filter(product => +product.cid === +id);
       setProduct(product);
    },[allProducts, id])

    
    return product && (typeof product[0]?.about !== 'string' ? <ul>{product[0]?.about.map((item, index )=> <li key={index}><AddchartIcon className="global-color"/> {item}</li>)}</ul>  :  <p className="about_text">{product && product[0]?.about}</p>)
}