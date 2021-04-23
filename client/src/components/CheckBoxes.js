import React from 'react';

const CheckBoxes=({s,values,setValues,selectedValues,setSelectedValues,handleSubCatChange})=>{

    
    return(
    
        <div className="checkbox-div">
         
            <input type="checkbox" 
                   id="aaa" 
                   value={s._id} 
                    onChange={()=>handleSubCatChange(s._id)}
                    checked={selectedValues && selectedValues.includes(s._id)}
                />
            <label htmlFor="aaa">{s.name}</label>
        </div>
      
    )
}

export default CheckBoxes;