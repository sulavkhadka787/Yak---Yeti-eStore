import React,{useState} from 'react';
import { toast } from 'react-toastify';
import {auth} from '../../firebase';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const Password=()=>{

    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [loading,setLoading]=useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        
        if(password !== confirmPassword){
            toast.error("Confirm password doesn't match");
            return;
        }
       
        await auth.currentUser.updatePassword(password)
            .then(()=>{
                setLoading(false);
                toast.success('Password Updated');
            })
            .catch(err=>{
                setLoading(false);
                toast.error(err.message);
            })
    }

    return(
        <>
        <div className="password-wrap wrap">
            <p>Yak & Yeti</p>
            <form className="login-form" onSubmit={handleSubmit}>

                <div className="form-header">
                   {loading ? (<h3>Loading...</h3>):(<h3>Update Password</h3>) }                    
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="Enter new Password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        disabled={loading}
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-input" 
                        placeholder="Confirm new password" 
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <button className="form-button" type="submit">Submit</button>
                </div>
            </form>
            
  
        </div>
    </>
    )
}

export default Password;