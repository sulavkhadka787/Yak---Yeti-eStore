import React,{useState,useEffect} from 'react';
import StarRating from 'react-star-ratings';
import Defaultimage from '../../images/defaultimage.jpg';
import {useSelector} from 'react-redux';
import {useHistory,useParams} from 'react-router-dom';
import {showAverage} from '../../functions/rating';

const SingleProductImages=({product,onStarClick,star})=>{

    const [selected ,setSelected]=useState('');
    const [showStar, setShowStar]=useState(true);

    const {title,images,category,price,_id}=product;
    

    const {user}=useSelector((state)=>({...state}));
    const history=useHistory();
    let {slug}=useParams();
    console.log('slug',slug);
    
    
    useEffect(()=>{
        if(images && images.length){
            setSelected(images[0].url)
        }
       
    },[images])
    
    const changeImage=(e)=>{
        console.log('imageonclick',e.target.src);
        setSelected(e.target.src);
    }

    const showRatingDiv=()=>{
        if(user && user.token){
            setShowStar(false);
        }else{
            history.push({
                pathname:'/login',
                state:{from:`/product/${slug}`}
            });
        }
        
    }
    return(
        <>
            <div className="small-container single-product">
                <div className="row">
                    <div className="col-2">
                        {images && images.length  ? (<img  className="col2-img" src={selected} />):(<img className="col2img" src={Defaultimage} />) }
            
                        <div className="small-img-row">
                          {images && images.length ? (images.map(img=>
                            <div onClick={changeImage} key={img.public_id} className="small-img-col">
                                <img src={img.url}   className="small-img"/>
                            </div>
                          )):(
                              <div>No Preview</div>
                          )}
                          
                        </div>

                    </div>

                    <div className="col-2">
                        <h1>{title}</h1>
                        {product && product.ratings && product.ratings.length>0
                            ? (showAverage(product))
                            :(<StarRating 
                                starRatedColor="orange"
                                numberOfStars={5}   
                            />) 
                        }
                       
                        <h2>Category:{category && category.name}</h2>
                        
                        <h4>${price}</h4>
                        <h4>Available Stock:</h4>
                        <input type="number" />
                        <a href="" className="btn">Add to Card</a>
                        <div onClick={showRatingDiv} className={showStar ? "user-rating" :"star-rating"}><i className="far fa-star"/>{" "}Leave a Rating</div>
                        <div  className={showStar ? "star-rating ":"show-star-rating star"}>
                        <StarRating 
                            starDimension="20px" 
                            starRatedColor="orange"
                            numberOfStars={5}
                            name={_id}
                            rating={star}
                            changeRating={onStarClick} 
                            isSelectable={true}  
                        /> 
                        </div>
                        
                        
                        <h3>Product Details<i className="fa fa-indent"></i></h3>
                        <br/>
                        <p>{product.description}</p>
                    </div>

                </div>
            </div>
       </>
    )
        }
export default SingleProductImages;