import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddchartIcon from '@mui/icons-material/Addchart';

export const Diia =()  => {

    const [product, setProduct] = useState();
    const allProducts = useSelector(state => state.products);
    const {id} = useParams();

    useEffect(()=>{     
        const product = allProducts.filter(product => +product.cid === +id);
       setProduct(product);
    },[allProducts, id])



    return  product && (typeof product[0]?.diia !== 'string' ? <ul className="components_list">{product && product[0]?.diia.map((diia, index) => <li className="components_item" key={index}><AddchartIcon className="global-color"/> {diia}</li>)}

    </ul> : <p>{product[0]?.diia}</p> )
}