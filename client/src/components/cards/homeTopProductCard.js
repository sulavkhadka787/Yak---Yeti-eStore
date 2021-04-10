import React from 'react';
import {Link} from 'react-router-dom';
import defaultimage from '../../images/defaultimage.jpg';

const HomeTopProductCard=({product})=>{
    
    return(
        <div className="images-column-top">
            <img className="column-top-images" src={product.images[0].url} alt="" />
            <div className="view-cart">
                <Link to=""><i className="far fa-eye"></i></Link>
                <Link to="`/product/${slug}"><i className="fas fa-shopping-cart"></i></Link>
            </div>
            
        </div>
    )
}

export default HomeTopProductCard;