import React,{useState,useEffect} from 'react';
import AdminNav from '../../components/AdminNav';
import {getOrders,changeStatus} from '../../functions/admin';
import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import Orders from '../../components/order/Orders';



const AdminDashboard=()=>{

    const [orders,setOrders]=useState([]);
    const {user} =useSelector((state)=>({...state}));

    useEffect(()=>{
        loadOrders();
    },[]);

    const loadOrders=()=>
        getOrders(user.token).then((res)=>{
            console.log(JSON.stringify(res.data,null,4));
            setOrders(res.data);
        });

    const handleStatusChange=(orderId,orderStatus)=>{
        changeStatus(orderId,orderStatus,user.token).then((res)=>{
            toast.success("Status updated");
            loadOrders();
        })
    }

    return(
        <>
        <div className="admin-container">
            <div className="admin-sidenav">
                <AdminNav/> 
            </div>
            
            <div className="main-content">
            {/* {JSON.stringify(orders)} */}
                <h2 className="admin-dashboard-h2">Admin Dashboard</h2>
                <Orders orders={orders} handleStatusChange={handleStatusChange} />
            </div>
        </div>
        
        </>
        
    )
}

export default AdminDashboard;