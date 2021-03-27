import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Nav=()=>{
    const [navToggle, setNavToggle]=useState(false);

    const dispatch=useDispatch();
    const history=useHistory();

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        //console.log('redux=user',user);
    },[user])

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
                    <span className="navbar-toggle" id="js-navbar-toggle" onClick={handleToggle}>
                        <i className="fas fa-bars"></i>
                    </span>
                    <Link to="/" className="logo">Yak & Yeti</Link>
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
                            <Link to="/" className="nav-links">Products</Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-links">About Us</Link>
                        </li>
                        <li>
                        <Link to="/" className="nav-links">Contact Us</Link>
                        </li>
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
                            <input type="search" className="search nav-links" placeholder="search" />
                        </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;