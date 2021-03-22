import React, { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import {useSelector} from 'react-redux';

const RegisterComplete=({history})=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [userName,setUserName]=useState('');

    const {user}=useSelector((state)=>({...state}));


    useEffect(()=>{
        if(user && user.token){
            history.push('/');
            return;
        }
        setEmail(window.localStorage.getItem('emailForRegistration'));
        console.log(window.location);
    },[user]);

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!email||!password||!confirmPassword||!userName){
            toast.error('Please fillout the empty fields')
        }

        if(password.length<6){
            toast.error('Password should be mininum six characters long');
        }

        if(password !==confirmPassword){
            toast.error('Password and Confirm Password does\'t match');
        }

        try{
            const result=await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            console.log('sigininwithemaillink===result',result);

            if(result.user.emailVerified){
                window.localStorage.removeItem('emailForRegistration');
                let user=auth.currentUser;

                await user.updatePassword(password);
                await user.updateProfile({
                    displayName:userName
                });

                const idTokenResult=await user.getIdTokenResult();

                console.log("user",user,"idtokentresult",idTokenResult);

                //history.push('/');

            }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    return(
        <>
            <div className="wrap">
                <p>Yak & Yeti</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h3>Complete Registration</h3>                    
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-input" 
                            placeholder="Enter email address" 
                            value={email} disabled
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Enter Username" 
                            onChange={(e)=>setUserName(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Enter Password" 
                            onChange={(e)=>setPassword(e.target.value)}    
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Confirm Password" 
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="form-button" type="submit">Register</button>
                    </div>
                   
                </form>
                
      
            </div>
        </>
    )
}
export default RegisterComplete;