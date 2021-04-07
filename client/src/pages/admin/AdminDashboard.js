import React from 'react';
import AdminNav from '../../components/AdminNav';


const AdminDashboard=()=>{


    return(
        <>
        <div className="admin-container">
            <div className="admin-sidenav">
                <AdminNav/> 
            </div>
            
            <div className="main-content">
                <h2 className="admin-dashboard-h2">Admin Dashboard</h2>
               
            </div>
        </div>
        
        </>
        
    )
}

export default AdminDashboard;