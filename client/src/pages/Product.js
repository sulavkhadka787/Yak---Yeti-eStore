import React,{useEffect,useState} from 'react';
import {getProduct,productStar} from '../functions/product';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import Nav from '../components/nav';
import Footer from '../components/footer';
import SingleProductImages from '../components/singleProduct/singleProductImages';


const Product=({match})=>{
    
    const[product,setProduct]=useState({});
    const[star,setStar]=useState(0);
    
    //console.log('match',match)

    const {user}=useSelector((state)=>({...state}));
    const {slug}=match.params;

    useEffect(()=>{
        loadSingleProduct();
    },[slug]);

    useEffect(()=>{
        if(product.ratings && user){
            let existingRatingObject=product.ratings.find((ele)=>ele.postedBy.toString()===user._id.toString());
            existingRatingObject && setStar(existingRatingObject.star);
        }
    })

   
    const loadSingleProduct=()=>{
        getProduct(slug).then((res)=>{
            console.log('getprdocutimage',res.data);
            setProduct(res.data);
        });
    }    

    const onStarClick=(newRating,name)=>{
        console.log('newrating',newRating,'name',name);
        
        try{
            productStar(name,newRating,user.token).then((res)=>{
                console.log('rating-res',res.data);
                setStar(newRating);
                loadSingleProduct();
                toast.success('Your Ratings has been submitted, it will appear soon');
            })
           
        }catch(err){
            toast.err(err);
        }
        
       
    }

    return(
        <>
        <Nav/>
        <SingleProductImages product={product} onStarClick={onStarClick} star={star} />
        <Footer />
       
        </>
    )
}
export default Product;