import React,{useEffect, useState} from 'react';
import AdminNav from '../../../components/AdminNav';
import ProductCreateForm from '../../../components/form/ProductCreateForm';

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createProduct} from '../../../functions/product.js';
import {getCategories,getCategorySubs} from '../../../functions/category';


const initialState={
    title:'rayban glasses',
    description:'great glasses',
    price:'200',
    categories:[],
    category:'',
    subs:[],
    shipping:'',
    quantity:'23',
    images:[],
    color:'red',
    brand:'Rayban',
}
const ProductCreate=()=>{

    const [values,setValues]=useState(initialState);
    const [subOptions,setSubOptions]=useState([]);
    const [showSub,setShowSub]=useState(false);
    const [cboxes, setCboxes]=useState([]);
    const[selectedValues,setSelectedValues]=useState([]);

    const{
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        color,
        brand

    } = values;
    

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        loadCatgories();
    },[]);

    useEffect(()=>{
        setValues({...values,subs:selectedValues});
    },[selectedValues])

    const loadCatgories=()=>getCategories()
        .then((res)=>{
                //console.log('product-create-categores-res',res);
                setValues({...values,categories:res.data})
        })

    
    const handleSubmit=(e)=>{
        e.preventDefault();
        createProduct(values,user.token)
            .then((res)=>{
                //console.log('product-create-res',res)
                window.alert(`${res.data.title} is created`);  
                window.location.reload(); 
            })
            .catch((err)=>{
                console.log('product-create-res',err);
                toast.error(err.response.data.err);
                //toast.error('error creating product');
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
        setShowSub(true)
    }


    const handleSubCatChange = (checkedName) => {
        
        if (selectedValues.includes(checkedName)) {
         setSelectedValues(selectedValues.filter((c) => c !== checkedName));
        } else {
          setSelectedValues([...selectedValues, checkedName]);
        }
        
      };
    


    return(
        <>

        {JSON.stringify(values.category)}
        {JSON.stringify(values.subs)}
        {JSON.stringify(selectedValues)}
            <div className="admin-container">
                <div >
                    <AdminNav/> 
                </div>

                <div className="main-content">
                    <div className="category-create-form">
                    <h2>Create New Product</h2>
                         <ProductCreateForm 
                            handleSubmit={handleSubmit} 
                            handleChange={handleChange} 
                            handleCategoryChange={handleCategoryChange} 
                            values={values}
                            setValues={setValues}
                            subOptions={subOptions}
                            showSub={showSub}
                            setCboxes={setCboxes}
                            cboxes={cboxes}
                            setValues={setValues}
                            handleCategoryChange={handleCategoryChange}
                            selectedValues={selectedValues}
                            setSelectedValues={setSelectedValues}
                            handleSubCatChange={handleSubCatChange}
                        /> 
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCreate;