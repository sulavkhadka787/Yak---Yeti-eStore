import React,{useState,useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

const ForgotPassword=({history})=>{

    const [email,setEmail]=useState('');
    const[loading,setLoading]=useState(false);

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        if(user && user.token){
            history.push('/')
        }
    },[user,history])
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);

        const config={
            url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp:true
        }

        await auth.sendPasswordResetEmail(email,config)
            .then(()=>{
                setEmail('');
                setLoading(false);
                toast.success('Check your email for password reset link');
            })
            .catch((err)=>{
                setLoading(false);
                toast.error(err.message);
                console.log('change-password-err'.err);
            })
    }

    return(
        <div className="wrap">
        <p>Yak & Yeti</p>
        <form className="login-form" onSubmit={handleSubmit}>

            <div className="form-header">
               {loading ? (<h3>Loading...</h3>):(<h3>Change Password</h3> )}                    
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter email address to change password" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    autoFocus
                />
            </div>
            <div className="form-group">
                <button className="form-button" type="submit">Submit</button>
            </div>
        </form>
        

    </div>
    )
}
export default ForgotPassword;