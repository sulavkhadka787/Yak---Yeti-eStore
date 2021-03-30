import React from 'react';
import AdminNav from '../../components/AdminNav';
import Footer from '../../components/footer';

const AdminDashboard=()=>{

    return(
        <>
        <div className="admin-container">
            <div classname="admin-sidenav">
                <AdminNav/> 
            </div>
            
            <div className="main-content">
                <p>admin dashboard</p>
            </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default AdminDashboard;