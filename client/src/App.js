import React, { useEffect } from 'react';
import {Switch,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Home from './Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';


const App=()=> {

  const dispatch=useDispatch();

  useEffect(()=>{
    //get the currently logged in user
    const unsubscribe=auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult=await user.getIdTokenResult();
        //console.log('app-idtokenresult',idTokenResult);
        //console.log('app-user',user);
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{
            name:user.displayName,
            email:user.email,
            token:idTokenResult.token
          }
        })
      }
    })
    //cleanup
    return ()=>unsubscribe();
  })
  return (
    <>
        <ToastContainer/>    
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword}/>
    </Switch>
    </>
    
  );
}

export default App;
