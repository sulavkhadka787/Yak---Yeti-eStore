import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Nav from '../components/nav';
import ModalImage from 'react-modal-image';
import DefaultImage from '../images/defaultimage.jpg';
import CartTable from '../components/cart/cartTable';
import {userCart} from '../functions/user';

const Cart=({history})=>{

    const [count, setCount]=useState(0)
    const {cart,user}=useSelector((state)=>({...state}));   
    const dispatch=useDispatch();

    const getTotal=()=>{
        return cart.reduce((currentValue,nextValue)=>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }
        
    const saveOrderToDb=()=>{
       userCart(cart,user.token)
        .then(res=>{
            console.log('SAVE ORDER TO DB -RES',res);
            if(res.data.ok){
                history.push('/checkout');
            }
        })
        .catch((err)=>console.log('cart save err',err));
    }

    

    return(
        <>
        
            <Nav/>
            <div className="cart-container">
                <div className="cart-table-container">
                    <h3>Your Cart Items : {cart.length}</h3>
                    {cart.length > 0 ? ( 
                        <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Color</th>
                                <th>Count</th>
                                <th>Shipping</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart.map((c,i)=>(
                            <CartTable c={c} key={i} />
                        ))
                        }   
                        
                        
                        </tbody>
                    
                    </table>
                    
                    ) :(
                        <Link to="/shop">Continue Shopping...</Link>
                    )}
                    
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
                                <button 
                                    onClick={saveOrderToDb} 
                                    disabled={cart.length < 1} 
                                    className= {cart.length > 0 ? ("btn-checkout"):( "btn-checkout-off")} 
                                >
                                    Proceed to Checkout
                                </button>
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

export default Cart;