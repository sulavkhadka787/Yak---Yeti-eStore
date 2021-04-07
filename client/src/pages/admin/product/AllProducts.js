import React,{useEffect,useState} from 'react';
import AdminNav from '../../../components/AdminNav';
import Footer from '../../../components/footer';
import {getProductsByCount} from  '../../../functions/product';
import AdminProductCard from '../../../components/cards/adminProductCard';
import {removeProduct} from '../../../functions/product';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';

const AllProducts=()=>{

    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState();

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
           loadAllProducts();

    },[])

    const loadAllProducts=()=>{
        setLoading(true);
        getProductsByCount(100)
        .then((res)=>{
            console.log('get-all-products',res)
            setLoading(false);
            setProducts(res.data)
        })
        .catch((err)=>{
            setLoading(false);
            console.log(err)
        })
    }

    const handleRemove=(slug)=>{
        let answer=window.confirm("Confirm Delete ?");
        if(answer){
            console.log("send delete request",slug);
            removeProduct(slug,user.token)
                .then((res)=>{
                    console.log('remove-product-res',res);
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted`)
                })
                .catch((err)=>{
                    console.log('remove-product-err',err);
                    if(err.response.status===400){
                        console.log('remove-product-res-err',err);
                        toast.error(err.response.data);
                    }
                })
        }
    }

    return(
        <>
        <div className="admin-container">
            <div className="admin-sidenav">
                <AdminNav/> 
            </div>
            
            <div className="main-content">
                {loading ? <h4>Loading...</h4> : <h2 className="admin-dashboard-h2">All Products</h2>}
                {/* <p>{JSON.stringify(products)}</p> */}
                <div className="main-content-product-list">
                {products.map((product)=><AdminProductCard key={product._id} product={product} handleRemove={handleRemove} />)}
                </div>
                
                
            </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default AllProducts;