import React from 'react';
import CheckBox from '../CheckBoxes';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';


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
    setSelectedValues,handleSubCatChange,loading,setLoading})=>{

    // //destructure
    // const{
    //     title,
    //     description,
    //     price,
    //     categories,
    //     category,
    //     subs,
    //     shipping,
    //     quantity,
    //     images,
    //     color,
    //     brand

    // } = values;

    //destructure
    const{
        title,
        description,
        
        categories,
        
        quantity,
       
        color,
        brand

    } = values;

    const {user}=useSelector((state)=>({...state}));

    const fileUploadAndResize=(e)=>{
        console.log('fileupload',e.target.files);
        let files=e.target.files;
        let allUploadedFiles=values.images;

        if(files){
            setLoading(true);
            for(let i=0;i<files.length;i++){
                Resizer.imageFileResizer(files[i],720,720,'JPEG',100,0,(uri)=>{
                    //console.log(uri);
                    axios.post(
                        `${process.env.REACT_APP_API}/uploadimages`,
                         {image:uri},
                         {headers:{authtoken: user ? user.token :""}})
                    .then(res=>{
                        console.log('IMAGE UPLOAD RES-DATA',res);
                        setLoading(false);
                        allUploadedFiles.push(res.data);
                        setValues({...values,images:allUploadedFiles})
                    })
                    .catch(err=>{
                        setLoading(false);
                        console.log('CLOUDINARY UPLOAD ERR')
                    })
                },"base64");
            }
        }
    }

    const handleImageRemove=(public_id)=>{
        console.log('image-id',public_id);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/removeimages`,
            {public_id},
            {headers:{authtoken:user ? user.token:''}}
        ).then((res)=>{
            console.log('image-delete-res',res);
            setLoading(false);
            const {images}=values;
            let filteredImages=images.filter((item)=>{
                return item.public_id !== public_id
            })
            setValues({...values,images:filteredImages})
        }).catch((err)=>{
            console.log('image-delete-err',err);
            toast.error('image deletion failed');
            setLoading(false);
        })

    }
    

    return(
        <>
        
            <form onSubmit={handleSubmit}>
                {values.images.length>0 &&
                    <div className="product-img-div-container">
                    {loading ? (<p>Loading...</p>):(
                        
                            values.images.map((image)=>
                                
                                   <div key={image.public_id} className="product-img-div">
                                        <img  className="product-img" src={image.url} />
                                        <span className="img-cross" onClick={()=>handleImageRemove(image.public_id)}>
                                            <i className="fas fa-times"></i>
                                        </span>
                                    </div>
                                    
                               
                            )
                    )}
                        
                    </div>
                }
                    <div className="images-div">
                    <label>Upload Images
                        <input type="file" multiple accept="images/*" onChange={fileUploadAndResize} hidden/>
                    </label>
                    </div>
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
                    <textarea  
                        name="description" 
                        placeholder={'Product description'} 
                        value={description} 
                        rows="4" 
                        cols="50" 
                        onChange={handleChange}
                        className="textarea-product"
                    />
  
                    
                        {/* <input 
                            type="text" 
                            name="description"
                            value={description}
                            placeholder="Product Description"
                            onChange={handleChange}
                        /> */}
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