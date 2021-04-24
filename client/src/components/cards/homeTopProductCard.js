import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import defaultimage from '../../images/defaultimage.jpg';
import {showAverage} from '../../functions/rating';
import _ from 'lodash';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const HomeTopProductCard=({product})=>{
    const [tooltip,setTooltip]=useState('Click to add');

    //redux
    
    const {cart}=useSelector((state)=>({...state}));
    const dispatch=useDispatch();


    const handleAddToCart=()=>{
        let cart=[];
        if(typeof window !=='undefined'){
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem('cart'));
            }

            //push new product to cart
            cart.push({
                ...product,
                count:1
            })

            //remove duplicates
            let unique=_.uniqWith(cart,_.isEqual);
            console.log('unique-lodash-cart',unique);
            localStorage.setItem("cart",JSON.stringify(unique));
            setTooltip("Added");
            //add to redux state
            dispatch({
                type:'ADD_TO_CART',
                payload:unique
            })
        }
    }
    
    return(
        <>
       
            <div className="images-column-top">
                <div className="test">
                {product && product.images  && product.images.length ? 
                    (<img className="column-top-images" src={product.images[0].url}   alt =""/>)
                                :(<img className="column-top-images" src={defaultimage}  alt ="" />)}
                <div className="view-cart">
                   <Link to={`/product/${product.slug}`}><i className="far fa-eye"></i></Link>
                            
                   {product && product.ratings && product.ratings.length >0 
                   ? showAverage(product)
                    : <p className="no-ratings-text"><strong>No Ratings Yet</strong></p>
                   }
                    <Tippy content={tooltip}><a onClick={handleAddToCart}><i className="fas fa-shopping-cart"></i></a></Tippy>
                </div>
                </div>
                
            </div>
       
            
            
            
       
       
        </>
        
    )
}

export default HomeTopProductCard;