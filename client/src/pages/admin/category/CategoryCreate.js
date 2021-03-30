import React,{useState,useEffect} from 'react';
import AdminNav from '../../../components/AdminNav';
import Footer from '../../../components/footer';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {createCategory,getCategories,removeCategory} from '../../../functions/category';

const CategoryCreate=({history})=>{

    const [name, setName]=useState('');
    const [loading,setLoading]=useState(false);
    const[categories,setCategories]=useState([]);

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        loadCategories();
    },[])

    const loadCategories=()=>getCategories()
                .then((res)=>{
                    console.log('getcategories-res',res);
                        setCategories(res.data);
                        
                })
                .catch();


    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        createCategory({name},user.token)
            .then((res)=>{
                console.log('create-category-res',res);
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is created`);
                loadCategories();
            })
            .catch(err=>{
                setLoading(false);
                console.log('careate-category-err',err);
                toast.error(err.response.data);
                history.push('/admin/category');
            });
    }

    const handleRemove=async(slug)=>{
        if(window.confirm("Confirm Delete ?")){
            setLoading(true);
            removeCategory(slug,user.token)
                .then((res)=>{
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`)
                    loadCategories();
                })
                .catch((err)=>{
                    if(err.response.status===400){
                        toast.err(err.response.data);
                    }
                });
        }
    }


    return(
        <>
        <div className="admin-container">
            <div classname="admin-sidenav">
                <AdminNav/> 
            </div>
            
            <div className="main-content">
                <div className="category-create-form">
                    {loading ? (<h2>Loading..</h2>) : (<h2>Create Category</h2>)}
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
                <div className="all-categories">
                    <h2>All Categories</h2>
                    {categories.map((c)=>(
                        <div 
                            className="all-categories-list" 
                            key={c._id}>
                            <span className="cat-name">{c.name}</span> 
                            <div className="cat-delete-edit">
                                <button className="cat-delete" onClick={()=>handleRemove(c.slug)}>Delete</button>
                                <Link className="cat-edit" to={`/admin/category/${c.slug}`}>Edit</Link>
                            </div>
                            
                        </div> 
                    ))} 
                </div>
                 
            </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default CategoryCreate;