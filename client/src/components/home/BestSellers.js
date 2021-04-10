import React,{useEffect,useState} from 'react';
import {getProducts,getProductsCount} from '../../functions/product';
import Scrolltron from '../Scrolltron';
import HomeTopProductCard from '../cards/homeTopProductCard';
import ReactPaginate from 'react-paginate';

const BestSellers=()=>{

 const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [productsCount,setProductsCount]=useState(0);
  const [page,setPage]=useState(0);

  useEffect(()=>{
    loadAllProduct();
  },[page]);

  useEffect(()=>{
    getProductsCount().then((res)=>{
        setProductsCount(res.data);
        console.log('get-products-count',productsCount);
    })
      
  },[])

  const loadAllProduct=()=>{
      setLoading(true);
      //sort order limit
      getProducts("sold","desc",page)
        .then((res)=>{
            console.log('Bestsellers-getproducts',res);
            setProducts(res.data);
            setLoading(false);
        })
  }

  const changePage=({selected})=>{
    setPage(selected);
    
 }
    return(
        <div className="homepage-top">
      
                {/* {loading ? (<h3>Loading...</h3>) :(<h3>New Arrivals</h3>)} */}
                {loading ? <h3>Loading...</h3>:<h3><Scrolltron text={"Best Sellers"} /></h3>}
                <div className="homepage-top-container">
            
                    {products.map((product)=>
                        <HomeTopProductCard key={product._id} product={product} />   
                    )}
            
                </div>
                <ReactPaginate 
                   previousLabel={'Previous'}
                   nextLabel={"Next"}
                   pageCount={(Math.ceil(productsCount/3))*2}
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

export default BestSellers;