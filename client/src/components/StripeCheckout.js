import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import {createOrder,emptyUserCart} from '../functions/user';
import {Link} from 'react-router-dom';

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal,setCartTotal]=useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
    });
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);

      const payload=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
          card:elements.getElement(CardElement),
          billing_details:{
            name:e.target.name.value
          }
        }
      })

      if(payload.error){
        setError(`Payment failed ${payload.error.message}`)
        setProcessing(false);
      }else{

        createOrder(payload,user.token).then((res)=>{
          console.log('stripe-order-create-order',res.data);
          if(res.data.ok){
            //empty cart from localstorage
            if(typeof window !=='undefined'){
              localStorage.removeItem("cart");
            }
            //empty cart from redux
            dispatch({
              type:'ADD_TO_CART',
              payload:[]
            })

            //empty cart from database
            emptyUserCart(user.token);
          }
        })
        console.log('stripe-payload',JSON.stringify(payload,null,4));
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
  };

  const handleChange = async (e) => {
    if(e.empty===false){
      console.log('e-empty',e.empty);
    }
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
    {succeeded ? (<h4>Payment Complete</h4>) : (<h4>Complete your purchase with STRIPE</h4>)}
    <p>Total:${cartTotal}</p>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment Successful.{" "}
        <Link to="/user/history">See it in your purchase history</Link>
      </p>
    </>
  );
};

export default StripeCheckout;
