import React,{useState,useEffect} from 'react';
import AdminNav from '../../../components/AdminNav';
import Footer from '../../../components/footer';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCategories} from '../../../functions/category';
import {updateSub,getSub,removeSub} from '../../../functions/sub';

const SubUpdate=({match,history})=>{

    const [name, setName]=useState('');
    const [loading,setLoading]=useState(false);
    const[categories,setCategories]=useState([]);
    const [parent ,setParent]=useState([]);

    const {user}=useSelector((state)=>({...state}));

    useEffect(()=>{
        loadCategories();
        loadSub();
    },[])

    const loadCategories=()=>getCategories()
                .then((res)=>{
                    console.log('getcategories-res',res);
                        setCategories(res.data);
                        
                })
    .catch();

    const loadSub=()=>
        getSub(match.params.slug).then((s)=>{
                setName(s.data.name)
                setParent(s.data.parent)
        });


    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        updateSub(match.params.slug,{name,parent},user.token)
            .then((res)=>{
                console.log('create-sub-res',res);
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is created`);
                history.push('/admin/sub');
            })
            .catch(err=>{
                setLoading(false);
                console.log('careate-category-err',err);
                toast.error('Create sub failed');
                
            });
    }

    
    return(
        <>
        {JSON.stringify(parent)}
        <div className="admin-container">
            <div classname="admin-sidenav">
                <AdminNav/> 
            </div>
            
            <div className="main-content">
            
                <div className="category-create-form">
                    {loading ? (<h2>Loading..</h2>) : (<h2>Create Sub-Category</h2>)}
                    <div>
                        <label>Select Parent Category</label>
                        <select className="cat-select" onChange={(e)=>setParent(e.target.value)}>
                        <option>Please Select Category</option>
                            {categories.length >0 && categories.map((c)=>
                                    <option key={c._id} value={c._id} selected={c._id===parent}>
                                        {c.name}
                                    </option>)}
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
                
               
                
                
            </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default SubUpdate;