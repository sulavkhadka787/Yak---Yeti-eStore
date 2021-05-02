import React from 'react';
import { userCart } from '../../functions/user';
import {useSelector} from 'react-redux';


const ShowPaymentInfo=({order})=>{

    const {user}=useSelector((state)=>({...state}));
    console.log('order',order);
    return(
     <div>
         <p>Order-Id:<strong>{order.paymentIntent.id}</strong></p>
         <p>Amount:{" "}<strong>{(order.paymentIntent.amount/100).toLocaleString("en-US",{
             style:"currency",
             currency:'usd'
         })}</strong></p>
         <p>Payment method:{" "}
            <strong>{order.paymentIntent.payment_method_types[0]}</strong>
             ==== 
             {user.role==='user' ? (
                <>Payment Status:{" "}<span className="order-status-span"><strong>{order.paymentIntent.status==='succeeded' && 'Complete'}
              </strong></span></>
             )
             :
             (
                <>Payment Status:{" "}<span className="order-status-span"><strong>{order.orderStatus}</strong></span></>
             )
             }
             
        </p>
        <p>Order Date[mm/dd/yy]:{new Date (order.paymentIntent.created *1000).toLocaleString()}</p>
     </div>
    )
}

export default ShowPaymentInfo;