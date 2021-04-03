import React,{useState} from 'react';

const initialState={
    title:'glasses',
    subs:[],   
}

const subarray=['apple','banana','orange']

const ProductCreate=()=>{

    const [values,setValues]=useState(initialState);
    const[selectedValues,setSelectedValues]=useState([]);

    useEffect(()=>{

    },[selectedValues])


    const handleSubCatChange=(checkedName)=>{
        if(selectedValues.includes(checkedName)){
           setSelectedValues(selectedValues.filter((c)=> c!=(checkedName)))
        }else{
            setSelectedValues([...selectedValues,checkedName])
        }
    
        setValues({...values,subs:selectedValues})
        console.log('0000selected values',selectedValues);
        console.log('0001sub-values',values.subs);
    }


    {subarray.map((s)=>
    <div key={index} >
        {console.log('0002checkbox-selecvalues',selectedValues)}
          <input type="checkbox" 
                 value={s} 
                 onChange={()=>handleSubCatChange(s)}
     />
    </div>
    
    )}

    return(
        <>
        {JSON.stringify(values.subs)} 
        {JSON.stringify(selectedValues)}
        </>
    )

}
 