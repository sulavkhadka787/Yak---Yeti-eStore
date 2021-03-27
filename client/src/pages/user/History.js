import React,{useState,useEffect} from 'react';
import Nav from '../../components/nav';
import Password from './Password';
import Wishlist from './wishlist';
import Order from './orderHistory';

const History=()=>{

    const [route , setRoute]=useState('');


    useEffect(()=>{

    },[route])
    const showRoute=(path)=>{
        setRoute(path);
    }
    return(
        <>
        <Nav/>
        <div className="user-history">
                <div className="sidenav">
                    <ul>
                        <li onClick={()=>showRoute('history')}>History</li>
                        <li onClick={()=>showRoute('password')}>Password</li>
                        <li onClick={()=>showRoute('wishlist')}>Wishlist</li>
                    </ul>
                </div>

                <div className="content">

                    {route==='history' && <Order />}
                    {route==='password' && <Password />}
                    {route==='wishlist' && <Wishlist />}
                
                </div>
            </div>
        </>
        
    )
}

export default History;