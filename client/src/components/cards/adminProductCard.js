import React from 'react';
import {Link} from 'react-router-dom';
import DefaultImage from '../../images/defaultimage.jpg';

const AdminProductCard=({product,handleRemove})=>{

    const {title, price,images,description,slug}=product;

    return(
        <>
        <div className="product-card-container">
            <div className="product-card-details">
                <img src={images && images.length ? images[0].url : DefaultImage} alt=''/>
                <span>{title}&nbsp;&nbsp;&nbsp;{`$${price}`}</span>
                <span>{`${description && description.substring(0,10)}....`} </span>
                
               
            </div>
            <div className="product-edit-delete">
               <Link to={`/admin/product/${slug}`}> <div className="product-edit">Edit</div></Link>
                <div className="product-delete" onClick={()=>handleRemove(slug)}>Delete</div>
            </div>
        </div>
            
        </>
    )
}

export default AdminProductCard;