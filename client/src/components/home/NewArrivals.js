import React,{useEffect,useState} from 'react';
import {getProducts,getProductsCount} from '../../functions/product';
import Scrolltron from '../Scrolltron';
import HomeTopProductCard from '../cards/homeTopProductCard';
import ReactPaginate from 'react-paginate';

const NewArrivals=()=>{

  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [productsCount,setProductsCount]=useState(0);
  const [page,setPage]=useState(0);


  useEffect(()=>{
    loadAllProduct();
    //console.log('setpageuseffect',page);
  },[page]);

  useEffect(()=>{
    getNewProducts();
      
  },[])

  const loadAllProduct=()=>{
      setLoading(true);
      //sort order limit
      getProducts("createdAt","desc",page)
        .then((res)=>{
           // console.log('New Arrivals',res);
            setProducts(res.data);
            setLoading(false);
        })
  }

  const getNewProducts=()=>{
    getProductsCount().then((res)=>{
        setProductsCount(res.data);
       // console.log('get-products-count-new arrivals',productsCount);
    })
  }

  const changePage=({selected})=>{
      console.log('passing value selected',selected);
      setPage(selected);
      //console.log('setpage-seelected',page);
  }

    return(
        
        <div className="homepage-top">
      
                {/* {loading ? (<h3>Loading...</h3>) :(<h3>New Arrivals</h3>)} */}
                {loading ? <h3>Loading...</h3>:<h3><Scrolltron text={"New Arrivals"} /></h3>}
                
                  <div className="homepage-top-container">
                 
              
                    {products.map((product)=>
                        <HomeTopProductCard key={product._id} product={product} productsCount={productsCount}/>
                        
                        
                    )}
            
                </div>
                
                  
                  
               
                
               <ReactPaginate 
                   previousLabel={'Previous'}
                   nextLabel={"Next"}
                   pageCount={Math.ceil(productsCount/3)}
                   onPageChange={changePage}
                   containerClassName={"paginationBttns"}
                   previousLinkClassName={"previousBttn"}
                   nextLinkClassName={"nextBttn"}
                   disabledClassName={"paginationDisabled"}
                   activeClassName={"paginationActive"}
               />
            </div>
    )
}

export default NewArrivals;