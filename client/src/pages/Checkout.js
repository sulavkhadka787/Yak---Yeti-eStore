import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Nav from '../components/nav';

const Checkout=()=>{

    const saveAddressToDb=()=>{
        //
    }

    const saveOrderToDb=()=>{
        //
    }

    const {cart,user}=useSelector((state)=>({...state}));

    const getTotal=()=>{
        //
    }

    return(
        <>
        <Nav/>
            <div className="cart-container">
                <div>
                    <button onClick={saveAddressToDb}>Save address to db</button>
                </div>
            <div className="order-summary">
                     
                    <h3>Order Summary</h3>
                    <table className="order-summary-table">
                        <thead>
                            <tr>
                                <th>Product Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>

                        {cart.map((c,i)=>(
                        <tr key={i}>
                                <td>{c.title.substring(0,15)} </td>
                                <td>{c.count}</td>
                                <td>${c.count * c.price}</td>
                        </tr>
                    
                    ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td className="right"></td>
                            <td className="right total">Total:</td>
                            <td className="right">${getTotal()}</td>
                            
                        </tr>
                    </tfoot>
                    
                    </table>
                        
                        
                            {user ? (
                                <>
                                <button 
                                    onClick={saveOrderToDb} 
                                    disabled={cart.length < 1} 
                                    className= {cart.length > 0 ? ("btn-checkout"):( "btn-checkout-off")} 
                                >
                                    Proceed to Checkout
                                </button>

                                <a>Empty Cart </a>
                                </>
                            )
                            :
                            (
                                <button className="btn-checkout">
                                <Link 
                                    to={{
                                        pathname:"/login",
                                        state:{from:"cart"}
                                        }}
                                    
                                >
                                Login to Checkout</Link></button>
                            )
                            }        
                     
                 </div>      
            </div>
           
        </>
        
    )
    
}

export default Checkout;