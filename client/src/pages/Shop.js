import React,{useState,useEffect} from 'react';
import {getProductsByCount} from '../functions/product';
import {useSelector,useDispatch} from 'react-redux';
import HomeTopProductCard from '../components/cards/homeTopProductCard';
import Nav from '../components/nav';


const Shop=()=>{

    const [products, setProducts]=useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        loadAllProducts();
    },[]);

    const loadAllProducts=()=>{
        setLoading(true);
        getProductsByCount(12).then((prods)=>{
            setProducts(prods.data);
            setLoading(false);
        })
    }
    return(
        <>
            <Nav />
            <div className="homepage-top-container">
            {products.length<1 && <p>No Products Found</p>}
            {products && products.map((product)=>(
                <HomeTopProductCard product={product}/>
            ))}
            </div>
            
        </>
    )
}

export default Shop;