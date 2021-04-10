import React from 'react';
import Scrolltron from '../Scrolltron';

const Banner=()=>{
    return(
        <div className="banner">
                <img src="/images/banner.jpg"/>
                <span className="banner-slogan">
                <Scrolltron text={"A store that sells not just outfits but a trend"}/>
                </span>
                <span className="banner-slogan banner-slogan-small"> 
                Wear better, look better
                </span>
                
        </div>
    )
}

export default Banner;