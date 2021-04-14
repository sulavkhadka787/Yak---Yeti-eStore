import React from 'react';
import {Link} from 'react-router-dom';
import defaultimage from '../../images/defaultimage.jpg';

const HomeTopProductCard=({product,productsCount})=>{
    
    return(
        <>
       
            <div className="images-column-top">
                <div className="test">
                {product.images  && product.images.length ? (<img className="column-top-images" src={product.images[0].url}  />)
                                :(<img className="column-top-images" src={defaultimage}  />)}
                <div className="view-cart">
                    <Link to={`/product/${product.slug}`}><i className="far fa-eye"></i></Link>
                    <Link to="`/product/${slug}"><i className="fas fa-shopping-cart"></i></Link>
                </div>
                </div>
                
            </div>
       
            
            
            
       
       
        </>
        
    )
}

export default HomeTopProductCard;