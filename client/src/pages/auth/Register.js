import React,{useState,useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';


const Register=({history})=>{

    const [email,setEmail]=useState('');

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        if(user && user.token){
            history.push('/')
        }
    },[user])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log('env==>',process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config={
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp:true
        }

        await auth.sendSignInLinkToEmail(email,config);
        toast.success(
            `Email is sent to ${email}.Click the link to complete your registration`
        )

        //save user email in local storage
        window.localStorage.setItem('emailForRegistration',email);
        setEmail('');
    }

    return(
        <>
            <div className="wrap">
                <p>Yak & Yeti</p>
                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="form-header">
                        <h3>Register Email</h3>                    
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-input" 
                            placeholder="Enter email address" 
                            onChange={(e)=>setEmail(e.target.value)}
                            autoFocus
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
export default Register;