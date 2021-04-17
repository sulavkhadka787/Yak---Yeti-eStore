import React,{useState,useEffect} from 'react';
import {getProductsByCount,fetchProductsByFilter} from '../functions/product';
import {useSelector,useDispatch} from 'react-redux';
import HomeTopProductCard from '../components/cards/homeTopProductCard';
import Nav from '../components/nav';
import Slider from '../components/slider';


const Shop=()=>{

    const [products, setProducts]=useState([]);
    const [priceRange,setPriceRange]=useState(0);
    const [loading,setLoading]=useState(false);
    const [ok,setOk]=useState(false);

    const dispatch=useDispatch();

    const {search}=useSelector((state)=>({...state}));
    const{text}=search;

    useEffect(()=>{
        loadAllProducts();
    },[]);

    //1. load products by default on page load
    const loadAllProducts=()=>{
        setLoading(true);
        getProductsByCount(12).then((prods)=>{
            setProducts(prods.data);
            setLoading(false);
        })
    }

    //2. load products on user search input
    useEffect(()=>{
        //console.log('2. load products on user search input',text);
        const delayed=setTimeout(()=>{
            fetchProducts({query:text});
            if(!text){
                loadAllProducts();
            }
        },300);
        return ()=>clearTimeout(delayed);
        
    },[text])

    const fetchProducts=(arg)=>{
        fetchProductsByFilter(arg)
            .then(res=>{
                setProducts(res.data);
        })
    }

    //3.load products based on price range
    useEffect(()=>{
        console.log("ok to request");
        fetchProducts({price:[0,priceRange]})
    },[ok]);

    const handleSlider=(range)=>{
            dispatch({
                type:'SEARCH_QUERY',
                payload:{text:""}
            })
            console.log('range',range);
            setPriceRange(range);
            setTimeout(()=>{
                setOk(!ok);
            },300);
    }


    return(
        <>
            <Nav />
            
            <div className="search-container">
                <div className="search-sidebar">
                    <div className="price-range">
                        <h3>Price Range</h3>
                    <Slider priceRange={priceRange} setPriceRange={setPriceRange} handleSlider={handleSlider}/>
                    </div>
                </div>
                <div className="homepage-top-container main-shop-content">
                {products.length<1 && <p>No Products Found</p>}
                {products && products.map((product)=>(
                    <HomeTopProductCard key={product._id} product={product}/>
                ))}
                </div>
            </div>
            
            
        </>
    )
}

export default Shop;