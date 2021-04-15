import React,{useState,useEffect} from 'react';
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {createOrUpdateUser} from '../../functions/auth';
    
const Login=({history})=>{
    const historyState=history.location.state;
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);

    const dispatch=useDispatch();

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        if(historyState) return;
        if(user && user.token){
            history.push('/')
        }
    },[user,dispatch,history])

    const roleBasedRedirect=(res)=>{
        
        
        if(historyState){
            history.push(historyState.from);
        }else{
            if(res.data.role==="admin"){
                history.push('/admin/dashboard');
            }else{
                history.push('/user/history');
            }
        }
        
    }

    const handleSubmit=async(e)=>{
       e.preventDefault();

       if(!email || password.length<6){
           toast.error('Email or Password is incorrect')
           return;
       }
       setLoading(true);
       try{
            const result=await auth.signInWithEmailAndPassword(email,password);
            console.log('login-result',result);
            const {user}=result;
            
            const idTokenResult=await user.getIdTokenResult();
            

            createOrUpdateUser(idTokenResult.token)
                .then((res)=>{
                    dispatch({
                        type:'LOGGED_IN_USER',
                        payload:{
                            name:res.data.name,
                            email:res.data.email,
                            token:idTokenResult.token,
                            role:res.data.role,
                            _id:res.data._id
                        }
                    });
                    roleBasedRedirect(res);
                })
                .catch((err)=>console.log('createlogin-err',err.message));
                history.push('/');
           
            
       }catch(error){
            toast.error(error.message);
            console.log('login-error',error);
            setLoading(false);
       }
    }

    const googleLogin=async()=>{
        auth.signInWithPopup(googleAuthProvider)
            .then(async(result)=>{
                console.log('google-login-result',result);
                const {user}=result;
                const idTokenResult=await user.getIdTokenResult();
                
                createOrUpdateUser(idTokenResult.token)
                .then((res)=>{
                    dispatch({
                        type:'LOGGED_IN_USER',
                        payload:{
                            name:res.data.name,
                            email:res.data.email,
                            token:idTokenResult.token,
                            role:res.data.role,
                            _id:res.data._id
                        }
                    });
                    roleBasedRedirect(res);
                })
                .catch((err)=>console.log('createlogin-err',err.message));
                
                history.push('/');
            }).catch((err)=>{
                toast.error(err.message);
                console.log('google-login-error',err);
            })
    }

    return(
        <>
            <div className="wrap">
                <p>Yak & Yeti</p>
                <form className="login-form">
                    <div className="form-header">
                        {loading ? (<h3>Loading....</h3>): (<h3>Login</h3>   )}                 
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-input" 
                            placeholder="Enter email address" 
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="password" 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button 
                            className="form-button" 
                            type="submit" 
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                    </div>
                    <div className="form-footer">
                             Don't have an account? <Link to="/register">Sign Up</Link>
                    </div>
                    <div className="form-footer">
                              <Link to="/forgot/password">Forgot Password?</Link>
                    </div>
                </form>
                <div className="google-login">
                    <button 
                        className="google-btn"
                        onClick={googleLogin}
                        >Google login 
                        <i className="fab fa-google"></i>
                    </button>
                </div>
      
            </div>
        </>
    )
}
export default Login;