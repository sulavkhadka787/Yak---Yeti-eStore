import React,{useState,useEffect} from 'react';
import {getUserOrders} from '../../functions/user';
import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import {PDFDownloadLink} from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice'

const OrderHistory=()=>{

    const [orders,setOrders]=useState([]);
    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        loadUserOrders();
    },[]);

    const loadUserOrders=()=>{
        getUserOrders(user.token).then((res)=>{
            console.log(JSON.stringify(res.data,null,4));
            setOrders(res.data);
        })
    }

    const showDownloadLink=(order)=>
        <PDFDownloadLink 
            document={<Invoice order={order}/>}
            className="btn"
            fileName="invoice.pdf"
        >
            DownLoad Order Invoice PDF
        </PDFDownloadLink>
    

    const showOrderInTable=(order)=>
    <div className="order-summary user-order-summary">
        <table className="user-order-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Count</th>
                    <th>Shipping</th>
                </tr>
            </thead>
            <tbody>
                {order.products.map((p,i)=>(
                    <tr key={i}>
                        <td>{p.product.title}</td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.product.color}</td>
                        <td>{p.count}</td>
                        <td>{p.product.shipping}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
        

    const showEachOrders=()=>orders.map((order,i)=>(
        <div className="user-orders-container" key={i}>
            <ShowPaymentInfo order={order} />
           
            {showOrderInTable(order)}
            <p>{showDownloadLink(order)}</p>
           
        </div>
    ))

    return(
        <>
            <h3>Order history</h3>
            <h4>
                {orders.length > 0 
                    ? "User purchase orders"
                    :"No purchase orders"
                }
            </h4>
            {showEachOrders()}
        </>
    )
}

export default OrderHistory;