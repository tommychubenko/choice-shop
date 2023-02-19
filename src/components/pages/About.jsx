import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export const About = () => {
    const [product, setProduct] = useState();
    const allProducts = useSelector(state => state.products);
    const {id} = useParams();

    

    useEffect(()=>{     
        const product = allProducts.filter(product => +product.cid === +id);
       setProduct(product);
    },[allProducts, id])

    
    return <p className="about_text">{product && product[0]?.about}</p>
}