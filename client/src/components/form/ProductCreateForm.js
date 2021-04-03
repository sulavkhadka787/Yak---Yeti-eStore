import React from 'react';
import CheckBox from '../CheckBoxes';

const ProductCreateForm=({handleChange,
    handleSubmit,
    handleCategoryChange,
    subOptions,
    showSub,
    setCboxes,
    cboxes,
    values,
    setValues,
    selectedValues,
    setSelectedValues,handleSubCatChange})=>{

    //destructure
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
    return(
        <>
        
            <form onSubmit={handleSubmit}>
                    <div>
                        
                        <input 
                            type="text" 
                            name="title"
                            placeholder="Product Title"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        
                        <input 
                            type="text" 
                            name="description"
                            value={description}
                            placeholder="Product Description"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <select name="category" onChange={handleCategoryChange} className="cat-select">
                        <option>Select Categories</option>
                        {categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
                            
                        </select>
                    </div>

                    
                    
                    {showSub &&
                    <div className="sub-cat"> 
                        <h3> Sub Categories</h3>
                        {subOptions ? subOptions.map((s)=>
                        <CheckBox 
                            key={s._id} 
                            s={s} 
                            values={values}
                            setValues={setValues}
                            selectedValues={selectedValues}
                            setSelectedValues={setSelectedValues}
                            handleSubCatChange={handleSubCatChange}  
                            />
                        ) : ''}
                    </div> 
                    }
                    
                    <div>
                       
                        <input 
                            type="number" 
                            name="price"
                            placeholder="Product Price"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                       
                        <select  name="shipping" className="cat-select" onChange={handleChange}>
                            <option>Shipping </option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div>
                        
                        <input 
                            type="number" 
                            name="quantity"
                            value={quantity}
                            placeholder="Product Quantity"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                      
                        <input 
                            type="text" 
                            name="color"
                            placeholder="Product Color"
                            value={color}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                       
                        <input 
                            type="text" 
                            name="brand"
                            placeholder="Product Brand"
                            value={brand}
                            onChange={handleChange}
                        />
                    </div>
                   
                           
                            <button type="submit" className="btn-cat">Create-Product</button>
            </form>
        </>
    )

}

export default ProductCreateForm;