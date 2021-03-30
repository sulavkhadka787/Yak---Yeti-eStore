import React,{useState,useEffect} from 'react';
import AdminNav from '../../../components/AdminNav';
import Footer from '../../../components/footer';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getCategory,updateCategory} from '../../../functions/category';

const CategoryUpdate=({history,match})=>{

const [name, setName]=useState('');
const [loading,setLoading]=useState(false);

const {user}=useSelector((state)=>({...state}));

useEffect(()=>{
    //console.log('match',match);
    loadCategories();
},[])

const loadCategories=()=>getCategory(match.params.slug)
            .then((res)=>{
                console.log('getcategory',res);
                    setName(res.data.name);
            })
            .catch((e)=>{
                history.push('/admin/category');
                toast.error('invalid url');
            });


const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug,{name},user.token)
        .then((res)=>{
            console.log('udpate-category-res',res);
            setLoading(false);
            setName("");
            toast.success(`${res.data.name} is Updated`);
            history.push('/admin/category');
        })
        .catch((err)=>{
            setLoading(false);
            console.log('create-category-err',err);
            toast.error(err.response.data);
            
        });
}




return(
    <>
    <div className="admin-container">
        <div classname="admin-sidenav">
            <AdminNav/> 
        </div>
        
        <div className="main-content">
            <div className="category-create-form">
                {loading ? (<h2>Loading..</h2>) : (<h2>Update Category</h2>)}
                    <form onSubmit={handleSubmit}>
                        <label>Category Name</label>
                        <input 
                            type="text" 
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            autoFocus
                            required
                        />
                        <button type="submit" className="btn-cat">Save</button>
                    </form>
            </div>  
            <hr/>
            
             
        </div>
    </div>
    <Footer/>
    </>
    
)
}
export default CategoryUpdate;