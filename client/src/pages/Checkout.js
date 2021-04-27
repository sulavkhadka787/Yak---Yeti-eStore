import React, { useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Nav from '../components/nav';
import {getUserCart} from '../functions/user';

const Checkout=()=>{

    const [products,setProducts]=useState([]);
    const [total,setTotal]=useState(0);

    const {cart,user}=useSelector((state)=>({...state}));
    const dispatch=useDispatch();

    useEffect(()=>{
        console.log('checkout-useeffect');
        getUserCart(user.token).then((res)=>{
            console.log('user cart',JSON.stringify(res.data,null,4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        })
    },[]);


    const saveAddressToDb=()=>{
        //
    }

    const saveOrderToDb=()=>{
        //
    }

    

    const getTotal=()=>{
        return products.reduce((currentValue,nextValue)=>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }

    return(
        <>
        <Nav/>
            <div className="cart-container">
                <div>
                {JSON.stringify(products)}
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

                        {products.map((p,i)=>(
                        <tr key={i}>
                                <td>{p.product.title.substring(0,15)} </td>
                                <td>{p.count}</td>
                                <td>${p.count * p.product.price}</td>
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