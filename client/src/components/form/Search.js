import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

const Search=()=>{
    let dispatch=useDispatch();
    const {search}=useSelector((state)=>({...state}));
    const {text}=search;
   

    const history=useHistory();

    const handleChange=(e)=>{
       
        console.log(e.target.value);
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:e.target.value}
        })
    }

    const handleKeyPress=(e)=>{
        
       if(e.key==='Enter'){
          history.push(`/shop?${text}`)
       }
    }

    return(
        <input 
            type="search" 
            onChange={handleChange} 
            onKeyPress={handleKeyPress} 
            className="search nav-links" 
            placeholder="search" 
            value={text}
        /> 
    )
}

export default Search;