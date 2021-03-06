import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';

//load stripe outside of components render to avoid recreating stripe object on every render
const promise=loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment=()=>{
    return(
        <div className="stripe-window">
            
            <Elements stripe={promise}>
                <StripeCheckout />
            </Elements>
           
        </div>
    )
}

export default Payment;