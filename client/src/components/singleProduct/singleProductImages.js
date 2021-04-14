import React,{useState,useEffect} from 'react';
import StarRating from 'react-star-ratings';
import Defaultimage from '../../images/defaultimage.jpg'

const SingleProductImages=({product})=>{

    const [selected ,setSelected]=useState('');
    const {title,images,category,price,_id}=product;
    
    useEffect(()=>{
        if(images && images.length){
            setSelected(images[0].url)
        }
       
    },[images])
    
    const changeImage=(e)=>{
        console.log('imageonclick',e.target.src);
        setSelected(e.target.src);
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
                       <StarRating 
                           starRatedColor="orange"
                            numberOfStars={5}
                            name={_id}
                            rating={2}
                            changeRating={(newRating,name)=>console.log('newRating',newRating,"name",name)} 
                            isSelectable={true}   
                            /> 
                        <h2>Category:{category && category.name}</h2>
                        
                        <h4>${price}</h4>
                        <h4>Available Stock:</h4>
                        <input type="number" />
                        <a href="" className="btn">Add to Card</a>
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