import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Search from './form/Search';

const Nav=()=>{
    const [navToggle, setNavToggle]=useState(false);
    const[dashboardColor, setDashBoardColor]=useState(false);

    const dispatch=useDispatch();
    const history=useHistory();

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
       
        const aa=history.location.pathname.split('dashboard')[0];
       
        if(history.location.pathname==="/admin/dashboard"){
           
            
            setDashBoardColor(true);
        }
        
    },[user,dashboardColor])

    const handleToggle=()=>{
        setNavToggle(!navToggle);
    }

    const logout=()=>{
        firebase.auth().signOut();
        dispatch({
            type:'LOGOUT',
            payload:null
        });
        history.push('/login')
    }
    return(
        <>
                <nav className="navbar">
                    <span className="navbar-toggle"  onClick={handleToggle}>
                        <i className="fas fa-bars"></i>
                    </span>
                    <Link to="/" className="logo"><span className="logo-y">Y</span>ak & <span className="logo-y">Y</span>eti</Link>
                    <ul className={navToggle ? "main-nav active":"main-nav"} id="js-menu">
                        {user && user.token ?(
                            <li>
                                <Link to="/" className="nav-links"><i className="fas fa-user"></i>{" "}{user.name}</Link>
                            </li>
                        ):(
                            <li>
                                <Link to="/" className="nav-links">Home</Link>
                            </li>
                        )}
                    
                        <li>
                            <Link to="/shop" className="nav-links">Shop</Link>
                        </li>
                        {user && user.role==="admin" ? (
                            <li >
                                <Link 
                                    to="/admin/dashboard" 
                                    className="nav-links"
                                    >
                                    DashBoard
                                    </Link>
                            </li>
                        ):( user && user.role==="subscriber" ? (
                            <li>
                                <Link to="/user/history" className="nav-links">Account</Link>
                            </li>
                        ):(<li>
                                <Link to="/" className="nav-links">About Us</Link>
                            </li>)
                            
                        )}
                        
                        
                        {user && user.token ? (
                            <li>
                            <Link to="/login" className="nav-links" onClick={logout}>Logout</Link>
                        </li>
                        ):(
                            <li>
                                <Link to="/login" className="nav-links">Login</Link>
                            </li>
                        )}
                        <li>
                          {/* <input type="search" className="search nav-links" placeholder="search" />  */}
                          <Search />
                        </li>
                    
                        <li className="cart-img-li">
                           
                            <span className='cart-img-span'> <img className='cart-img' src="/images/cart.png"/>2</span>
                            
                        </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;