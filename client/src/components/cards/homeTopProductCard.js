import React from 'react';
import {Link} from 'react-router-dom';
import defaultimage from '../../images/defaultimage.jpg';
import StarRating from 'react-star-ratings';

const HomeTopProductCard=({product,productsCount})=>{
    
    return(
        <>
       
            <div className="images-column-top">
                <div className="test">
                {product.images  && product.images.length ? (<img className="column-top-images" src={product.images[0].url}  />)
                                :(<img className="column-top-images" src={defaultimage}  />)}
                <div className="view-cart">
                    <Link to={`/product/${product.slug}`}><i className="far fa-eye"></i></Link>
                    <div className="hompage-star"> 
                    <StarRating 
                            starDimension="20px" 
                            starRatedColor="orange"
                            numberOfStars={5}
                            
                            rating={5}
                            
                            isSelectable={true}  
                        /> </div>
                    <Link to="`/product/${slug}"><i className="fas fa-shopping-cart"></i></Link>
                </div>
                </div>
                
            </div>
       
            
            
            
       
       
        </>
        
    )
}

export default HomeTopProductCard;