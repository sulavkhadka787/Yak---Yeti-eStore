import React from 'react';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';

const Orders=({orders,handleStatusChange})=>{
    return(
        <>
            {orders.map((order)=>(
                <div key={order._id} className="user-orders-container">
                    <ShowPaymentInfo order={order} />
                    <div className="delivery-status-div">
                        <h3>Delivery Status</h3>
                        <div>
                            <select 
                                onChange={e=>handleStatusChange(order._id,e.target.value)} 
                                className="status-select"
                                defaultValue={order.orderStatus} 
                                name="status"   
                            >
                                <option value="Not Processed">Not Processed</option>
                                <option value="Processing">Processing</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
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
                </div>
        
            ))}
    </>
            )}

export default Orders;
