import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

const Cart=()=>{
    const {cart,user}=useSelector((state)=>({...state}));   
    const dispatch=useDispatch();

    return(
        <>
            <div>
                <div>Image</div>
                <div>Title</div>
                <div>Price</div>
                <div>Brand</div>
                <div>Color</div>
                <div>Count</div>
                <div>Shipping</div>
                <div>Remove</div>
            </div>
        </>
        
    )
}

export default Cart;