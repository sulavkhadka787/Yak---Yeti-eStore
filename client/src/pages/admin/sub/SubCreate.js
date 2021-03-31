import React,{useState,useEffect} from 'react';
import AdminNav from '../../../components/AdminNav';
import Footer from '../../../components/footer';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCategories} from '../../../functions/category';
import {createSub,getSubs,removeSub} from '../../../functions/sub';

const SubCreate=({history})=>{

    const [name, setName]=useState('');
    const [loading,setLoading]=useState(false);
    const[categories,setCategories]=useState([]);
    const[keyword,setKeyword]=useState('');
    const [category,setCategory]=useState('');
    const [subs ,setSubs]=useState([]);

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        loadCategories();
        loadSubs();
    },[])

    const loadCategories=()=>getCategories()
                .then((res)=>{
                    console.log('getcategories-res',res);
                        setCategories(res.data);
                        
                })
    .catch();

    const loadSubs=()=>getSubs().then((s)=>setSubs(s.data));


    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        createSub({name,parent:category},user.token)
            .then((res)=>{
                console.log('create-sub-res',res);
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is created`);
                loadSubs();
            })
            .catch(err=>{
                setLoading(false);
                console.log('careate-category-err',err);
                toast.error('Create sub failed');
                
            });
    }

    const handleRemove=async(slug)=>{
        if(window.confirm("Confirm Delete ?")){
            setLoading(true);
            removeSub(slug,user.token)
                .then((res)=>{
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`)
                    loadSubs();
                })
                .catch((err)=>{
                    if(err.response.status===400){
                        toast.err(err.response.data);
                    }
                });
        }
    }
    
    const handleSearchChange=(e)=>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }

    const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword);


    return(
        <>
        <div className="admin-container">
            <div classname="admin-sidenav">
                <AdminNav/> 
            </div>
            
            <div className="main-content">
            
                <div className="category-create-form">
                    {loading ? (<h2>Loading..</h2>) : (<h2>Create Sub-Category</h2>)}
                    <div>
                        <label>Select Parent Category</label>
                        <select className="cat-select" onChange={(e)=>setCategory(e.target.value)}>
                        <option>Please Select Category</option>
                            {categories.length >0 && categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    
                        <form onSubmit={handleSubmit}>
                            <label>Sub-Category Name</label>
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
                <div className="category-create-form">
                    <input 
                        type="search" 
                        placeholder="Filter / Search"
                        value={keyword}
                        onChange={handleSearchChange}
                    />
                    
                </div>
                
                <div className="all-categories">
                    <h2>All Sub-Categories</h2>
                    {subs.filter(searched(keyword)).map((s)=>(
                        <div 
                            className="all-categories-list" 
                            key={s._id}>
                            <span className="cat-name">{s.name}</span> 
                            <div className="cat-delete-edit">
                                <button className="cat-delete" onClick={()=>handleRemove(s.slug)}>Delete</button>
                                <Link className="cat-edit" to={`/admin/sub/${s.slug}`}>Edit</Link>
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

export default SubCreate;