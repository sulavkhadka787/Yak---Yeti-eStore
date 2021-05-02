import React,{useState,useEffect} from 'react';
import Nav from '../../components/nav';
import Password from './Password';
import Order from './orderHistory';

const History=()=>{

    const [route , setRoute]=useState('');


    // useEffect(()=>{

    // },[route]);


    // const showRoute=(path)=>{
    //     setRoute(path);
    // }
    return(
        <>
        <Nav/>
        <div className="user-history">
                

                <div className="content">

                   
                    <Order />
                    
                   
                
                </div>
            </div>
        </>
        
    )
}

export default History;