import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const PriceSlider=({priceRange,handleslider})=>{

    

    return(
        <>
        <InputRange
            maxValue={250}
            minValue={0}
            value={priceRange}
            formatLabel={value => `$${value}`}
            onChange={handleslider}
       />
        </>
    )

    
}

export default PriceSlider;