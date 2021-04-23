import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

const NavSearch=()=>{

    const dispatch=useDispatch();
    const {search}=useSelector((state)=>({...state}));
    const {text}=search;
    const history=useHistory();

    const handleChange=(e)=>{
        console.log('text-handle-change',e.target);
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:e.target.value}
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        history.push(`/shop?${text}`);
    }

    return(
        <>
            <form className='search-form' onSubmit={handleSubmit}>
                <input 
                    type='search'
                    value={text}
                    placeholder="Search"
                    onChange={handleChange}
                    className="search nav-links" 
                />
                <button className="btn-search" onClick={handleSubmit}><i className="fas fa-search"></i></button>
            </form>
        </>
    )
}

export default NavSearch;