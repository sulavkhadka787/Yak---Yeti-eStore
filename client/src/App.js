import React, { useEffect,lazy,Suspense} from 'react';
import {Switch,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import {currentUser} from './functions/auth';


// import Home from './pages/Home';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import RegisterComplete from './pages/auth/RegisterComplete';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import History from './pages/user/History';
// import UserRoute from './components/routes/UserRoute';
// import AdminRoute from './components/routes/AdminRoute';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/category/CategoryCreate';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCreate from './pages/admin/sub/SubCreate';
// import SubUpdate from './pages/admin/sub/SubUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import AllProducts from './pages/admin/product/AllProducts';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import Product from './pages/Product';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Payment from './pages/Payment';

const  Home = lazy(()=>import('./pages/Home'));
const  Login = lazy(()=>import('./pages/auth/Login'));
const  Register = lazy(()=>import( './pages/auth/Register'));
const  RegisterComplete = lazy(()=>import( './pages/auth/RegisterComplete'));
const  ForgotPassword = lazy(()=>import( './pages/auth/ForgotPassword'));
const  History = lazy(()=>import( './pages/user/History'));
const  UserRoute = lazy(()=>import( './components/routes/UserRoute'));
const  AdminRoute = lazy(()=>import( './components/routes/AdminRoute'));
const  AdminDashboard = lazy(()=>import( './pages/admin/AdminDashboard'));
const  CategoryCreate = lazy(()=>import( './pages/admin/category/CategoryCreate'));
const  CategoryUpdate = lazy(()=>import( './pages/admin/category/CategoryUpdate'));
const  SubCreate = lazy(()=>import( './pages/admin/sub/SubCreate'));
const  SubUpdate = lazy(()=>import( './pages/admin/sub/SubUpdate'));
const  ProductCreate = lazy(()=>import( './pages/admin/product/ProductCreate'));
const  AllProducts = lazy(()=>import( './pages/admin/product/AllProducts'));
const  ProductUpdate = lazy(()=>import( './pages/admin/product/ProductUpdate'));
const  Product = lazy(()=>import( './pages/Product'));
const  Shop = lazy(()=>import( './pages/Shop'));
const  Cart = lazy(()=>import('./pages/Cart'));
const  Checkout = lazy(()=>import('./pages/Checkout'));
const  Payment = lazy(()=>import('./pages/Payment'));




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
    <Suspense fallback={
      <div className="loading-spinner">
          <i class="fas fa-spinner"></i>
          <span>Loading Yak & Yeti estore......</span>
      </div>
    }>
        <ToastContainer/>    
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword}/>
        <Route exact path="/product/:slug" component={Product}/>
        <Route exact path="/shop" component={Shop}/>
        <Route exact path="/cart" component={Cart}/>
        <UserRoute exact path="/user/history" component={History}/>
        <UserRoute exact path="/checkout" component={Checkout}/>
        <UserRoute exact path="/payment" component={Payment} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
    </Switch>
    </Suspense>
    
  );
}

export default App;
