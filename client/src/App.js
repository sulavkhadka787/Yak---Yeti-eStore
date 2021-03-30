import React, { useEffect } from 'react';
import {Switch,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Home from './Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import {currentUser} from './functions/auth';


const App=()=> {

  const dispatch=useDispatch();

  useEffect(()=>{
    //get the currently logged in user
    const unsubscribe=auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult=await user.getIdTokenResult();
        
        currentUser(idTokenResult.token)
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
                })
            .catch((err)=>console.log('createlogin-err',err.message));
            
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
        <UserRoute exact path="/user/history" component={History}/>
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
    </Switch>
    </>
    
  );
}

export default App;
