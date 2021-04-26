import React from 'react';
import ModalImage from 'react-modal-image';
import DefaultImage from '../../images/defaultimage.jpg';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

const CartTable=({c})=>{

    const dispatch=useDispatch();

    const handleCount=(e)=>{
        //console.log('product-stock',c.quantity);
        let count=e.target.value <1 ? 1 :e.target.value
        if(count > c.quantity){
            toast.error(`Total items in stock: ${c.quantity}`);
            return;
        }

        let shoppingCart=[];

        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                shoppingCart=JSON.parse(localStorage.getItem('cart'));
            }

            shoppingCart.map((product,i)=>{
                if(product._id === c._id){
                    shoppingCart[i].count=count;
                }
               
            })

            localStorage.setItem('cart',JSON.stringify( shoppingCart));
            dispatch({
                type:'ADD_TO_CART',
                payload:shoppingCart
            })
        }
    }

    const handleRemove=()=>{
       // console.log('handle-remove',c._id);
       let shoppingCart=[];

       if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            shoppingCart=JSON.parse(localStorage.getItem('cart'));
        }

        shoppingCart.map((product,i)=>{
            if(product._id ===c._id){
                shoppingCart.splice(i,1);
            }
           
        })

        localStorage.setItem('cart',JSON.stringify( shoppingCart));
        dispatch({
            type:'ADD_TO_CART',
            payload:shoppingCart
        })
    }
    }

    return(
        <>
                 <tr>
                                {/* <td><img className="cart-table-img" src={c.images[0].url}/></td> */}
                                <td>
                                <div className="cart-table-img">
                                        {c.images.length ? (<ModalImage small={c.images[0].url} large={c.images[0].url} />)
                                        :
                                        (<ModalImage small={DefaultImage} large={DefaultImage} />)}
                                    </div>
                                </td>
                                <td>{c.title}</td>
                                <td>${c.price}</td>
                                <td>{c.brand}</td>
                                <td>{c.color}</td>
                                <td><input className="cart-item-count" type="number" value={c.count} onChange={handleCount}/></td>
                                <td>{c.shipping}</td>
                                <td><i onClick={handleRemove} className="fas fa-times"></i></td>
                            </tr>
        </>
    )
}

export default CartTable;