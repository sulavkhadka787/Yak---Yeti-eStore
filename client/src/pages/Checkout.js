import React, { useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../components/nav';
import {getUserCart,emptyUserCart,saveUserAddress} from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout=()=>{

    const [products,setProducts]=useState([]);
    const [total,setTotal]=useState(0);
    const [address,setAddress]=useState("");
    const [addressSaved,setAddressSaved]=useState(false);

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
        //console.log(address);
        saveUserAddress(user.token,address).then(res=>{
            if(res.data.ok){
                setAddressSaved(true);
            }
        })
    }

    const emptyCart=()=>{
        //remove from local storage
        if(typeof window !=="undefined"){
            localStorage.removeItem("cart");
        }

        //remove from redux
        dispatch({
            type:'ADD_TO_CART',
            payload:[]
        })

        //remove from backend
        emptyUserCart(user.token).then((res)=>{
            setProducts([]);
            setTotal(0);
            toast.error("Cart is empty..Continue Shopping");
        })

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
                <div className="cart-table-container react-quill-container">
                <h3>Delivery Address</h3>
                    <ReactQuill theme="snow" value={address} onChange={setAddress} />
                    <button className="btn-save-to-db btn-checkout" onClick={saveAddressToDb}>Save address to db</button>
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
                                
                                    disabled={!addressSaved || !products.length} 
                                    className= {addressSaved && products.length ? ("btn-checkout"):( "btn-checkout-off")} 
                                >
                                    Place Order
                                </button>

                                <button 
                                    disabled={!products.length}
                                    onClick={emptyCart} className="empty-cart">Empty Cart </button>
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