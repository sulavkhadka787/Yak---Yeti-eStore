import React,{useState} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const Slider=({priceRange,handleSlider})=>{

    return(
        <>
        <InputRange
            maxValue={250}
            minValue={0}
            value={priceRange}
            formatLabel={value => `$${value}`}
            onChange={handleSlider}
       />
        </>
    )
}

export default Slider;