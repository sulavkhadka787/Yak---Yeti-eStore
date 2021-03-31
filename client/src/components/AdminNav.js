import React,{useState} from 'react';
import {Link} from 'react-router-dom';

import Nav from '../components/nav';

const AdminNav=()=>{

    const [nav,setNav]=useState('false');

    const handleToggle=()=>{
        setNav(!nav);
    }
    return(
        <>
            
            <div className="admin-nav">
                    
                    <span className="navbar-toggle" id="js-navbar-toggle" onClick={handleToggle}>
                        <i className="fas fa-bars"></i>
                    </span>
                    <Link to="/" className="logo">Yak & Yeti</Link>
                        <ul className={nav ? "admin-nav-main-active":"admin-nav-main"}>
                            
                            <li><Link className="admin-links" to="/admin/dashboard">DashBoard</Link></li>
                            <li><Link className="admin-links" to="/admin/category">Category</Link></li>
                            <li><Link className="admin-links" to="/admin/sub">Sub-Category</Link></li>
                            <li><Link className="admin-links" to="/admin/product">Product</Link></li>
                            <li><Link className="admin-links" to="/admin/products">Products</Link></li>
                            <li><Link className="admin-links" to="/admin/coupon">Coupon</Link></li>
                            <li><Link className="admin-links" to="/user/password">Password</Link></li>
                            
                           
                        </ul>
                    

                   
            </div>
        </>
        
    )
}

export default AdminNav;