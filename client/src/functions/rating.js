import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage=(p)=>{
    if(p && p.ratings){
        let ratingsArray=p && p.ratings;
        let total=[];
        let length=ratingsArray.length;

        ratingsArray.map((r)=>total.push(r.star));
        let totalReduced=total.reduce((p,n)=>p+n,0);
        let highest=length*5;
        let result=(totalReduced*5)/highest;

        return(
            <div className="hompage-star"> 
                    <StarRating 
                            starDimension="24px" 
                            starRatedColor="red"
                            numberOfStars={5}
                            
                            rating={result}
                        /> 
            </div>
        )
    }
}
