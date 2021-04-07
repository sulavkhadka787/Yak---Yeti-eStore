import React,{useEffect, useState} from 'react';
import AdminNav from '../../../components/AdminNav';
import ProductUpdateForm from '../../../components/form/ProductUpdateForm';

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getProduct,updateProduct} from '../../../functions/product.js';
import {getCategories,getCategorySubs} from '../../../functions/category';


const initialState={
    title:'',
    description:'',
    price:'',
    categories:[],
    category:'',
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    color:'',
    brand:'',
}


const ProductUpdate=({match,history})=>{

    const [values,setValues]=useState(initialState);
    const [selectedValues,setSelectedValues]=useState([]);
    const [subOptions,setSubOptions]=useState([]);
    const [loading,setLoading]=useState(false);
    const [originalCategory,setOriginalCategory]=useState();

    const {user}=useSelector((state)=>({...state}));
    // console.log('matchparams',match);
    const {slug}=match.params;

    useEffect(()=>{
        loadCatgories();
        loadProduct();
        
    },[]);

    useEffect(()=>{
        setValues((prev)=>({...prev,subs:selectedValues}))
    },[selectedValues])

    const loadCatgories=()=>getCategories()
            .then((res)=>{
                    console.log('product-update-categores-res',res);
                    setValues((prev)=>({...values,categories:res.data}))
            })

    const loadProduct=()=>{
        getProduct(slug)
            .then((p)=>{
                console.log('get single productfor udpate',p)
                setValues((prev)=>({...prev,...p.data}))
                setOriginalCategory(p.data.category._id);
                getCategorySubs(p.data.category._id).then((res)=>{
                    setSubOptions(res.data);
                });
                let arr=[];
                p.data.subs.map((s)=>{
                    arr.push(s._id)
                });
                console.log('Array-0f subs',arr);
                setSelectedValues((prev)=>arr);
            });

    }

    

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        updateProduct(slug,values,user.token)
            .then((res)=>{
                console.log('udpate-product-res',res);
                setLoading(false);
                toast.success(`${res.data.title} is updated`);
                history.push('/admin/products');
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            })
            
    }

    const handleChange=(e)=>{
        //console.log(e.target.name,'----->',e.target.value);
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleCategoryChange=(e)=>{
        e.preventDefault();
        console.log('CLICKED CATEGORY',e.target.value);
        
            setValues({...values,category:e.target.value,subs:[]})
            setSelectedValues([]);
            getCategorySubs(e.target.value)
                .then((res)=>{
                    console.log('category-subcategory-res',res);
                    setSubOptions(res.data);
            });
        
       if(e.target.value===originalCategory){
           loadProduct();
       }
        
    }

    const handleSubCatChange = (checkedName) => {
        
        if (selectedValues.includes(checkedName)) {
         setSelectedValues(prev=>prev.filter((c) => c !== checkedName));
        } else {
          setSelectedValues(prev=>[...prev, checkedName]);
        }
        
      };
    

    return(
        <>
          {JSON.stringify(values.category)}  
          {JSON.stringify(values.subs)}  
          
            <div className="admin-container">
                <div >
                    <AdminNav/> 
                </div>
                

                <div className="main-content">
                    <div className="category-create-form">
                    {loading ? (<h2>Loading...</h2>) :(<h2>Product Update</h2>)}
                        
                        
                        
                        <ProductUpdateForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            values={values}
                            setValues={setValues}
                            handleCategoryChange={handleCategoryChange} 
                            subOptions={subOptions}
                            selectedValues={selectedValues}
                            setSelectedValues={setSelectedValues}
                            handleSubCatChange={handleSubCatChange}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductUpdate;