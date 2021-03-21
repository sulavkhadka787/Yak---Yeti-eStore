import React,{useState} from 'react';

const Home=()=>{

    const [navToggle, setNavToggle]=useState('false');

    const handleToggle=()=>{
        setNavToggle(!navToggle);
    }


    return(
        <>
            <nav className="navbar">
                <span className="navbar-toggle" id="js-navbar-toggle" onClick={handleToggle}>
                    <i className="fas fa-bars"></i>
                </span>
                <a href="#" className="logo">Yak & Yeti</a>
                <ul className={navToggle ? "main-nav active":"main-nav"} id="js-menu">
                    <li>
                        <a href="#" className="nav-links">Home</a>
                    </li>
                    <li>
                        <a href="#" className="nav-links">Products</a>
                    </li>
                    <li>
                        <a href="#" className="nav-links">About Us</a>
                    </li>
                    <li>
                        <a href="#" className="nav-links">Contact Us</a>
                    </li>
                    <li>
                        <a href="/login" className="nav-links">Login</a>
                    </li>
                    <li>
                        <input type="search" className="search nav-links" placeholder="search" />
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Home;
