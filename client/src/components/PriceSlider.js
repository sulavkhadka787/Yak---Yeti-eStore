import React,{useState}from 'react';
import InputRange from 'react-input-range';
import {useDispatch} from 'react-redux';
import 'react-input-range/lib/css/index.css';

const PriceSlider=({priceRange,setPriceRange,setOk,setStar,setSub,setShipping,ok})=>{

    const [range,setRange]=useState({min:0,max:500});
    const dispatch=useDispatch();

    const handleRange=(price)=>{
        console.log('handle-range',price);
        setRange(price);
        setPriceRange(range)
        console.log('setpricerange',priceRange);
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:''}
        })
        setPriceRange(range);
        setStar('');
        setSub('');
        setShipping('');
        setTimeout(()=>{
            setOk(!ok);
        },300);
    }

    return(
        <>
            <InputRange
                maxValue={500}
                minValue={0}
                value={range}
                formatLabel={value => `$${value}`}
                onChange={handleRange}
        />

       </>
    )

    
}

export default PriceSlider;