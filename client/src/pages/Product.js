import React,{useEffect,useState} from 'react';
import {getProduct} from '../functions/product';
import Nav from '../components/nav';
import Footer from '../components/footer';
import SingleProductImages from '../components/singleProduct/singleProductImages';


const Product=({match})=>{
    
    const[product,setProduct]=useState({});
    
    //console.log('match',match)

    const {slug}=match.params;

    useEffect(()=>{
        loadSingleProduct();
    },[slug]);

    


        const loadSingleProduct=()=>{
            getProduct(slug).then((res)=>{
               console.log('getprdocutimage',res.data);
                setProduct(res.data);
            });
        }    

    return(
        <>
        <Nav/>
        <SingleProductImages product={product} />
        <Footer />
       
        </>
    )
}
export default Product;