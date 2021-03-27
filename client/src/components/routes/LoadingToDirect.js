import React, { useEffect,useState } from 'react';
import {useHistory} from 'react-router-dom';

const LoadingToDirect=()=>{
    const [count,setCount]=useState(5);
    let history=useHistory();

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((currentCount)=>--currentCount);
        },1000);

        //redirect once the count is equal to zero
        count===0 && history.push('/');

        return ()=>clearInterval(interval);
    },[count]);

    return(
        <>
            <div className="loading-spinner">
                <p>Redirecting you in {count} seconds</p>
            </div>
            
        </>
    )
}
export default LoadingToDirect;