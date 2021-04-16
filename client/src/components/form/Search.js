import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

const Search=()=>{

    const [typedText, setTypedText]=useState('');
    let dispatch=useDispatch();
    const {search}=useSelector((state)=>({...state}));
    const {text}=search;
   

    const history=useHistory();

    const handleChange=(e)=>{
        setTypedText(e.target.value);
        console.log(e.target.value);
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:e.target.value}
        })
    }

    const handleKeyPress=(e)=>{
        
       if(e.key==='Enter'){
          history.push(`/shop?${typedText}`)
       }
    }

    return(
        <input 
            type="search" 
            onChange={handleChange} 
            onKeyPress={handleKeyPress} 
            className="search nav-links" 
            placeholder="search" 
            autocomplete="off"
            value={typedText}
        /> 
    )
}

export default Search;