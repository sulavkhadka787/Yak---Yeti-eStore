import React,{useState,useEffect} from 'react';
import {getProductsByCount,fetchProductsByFilter} from '../functions/product';
import {getCategories} from '../functions/category';
import {useSelector,useDispatch} from 'react-redux';
import HomeTopProductCard from '../components/cards/homeTopProductCard';
import Nav from '../components/nav';
import Slider from '../components/slider';
import StarSearch from '../components/StarSearch';



const Shop=()=>{

    const [products, setProducts]=useState([]);
    const [priceRange,setPriceRange]=useState({min:0,max:250});
    const [loading,setLoading]=useState(false);
    const [ok,setOk]=useState(false);
    const [categories,setCategories]=useState([]);
    const [categoryIds,setCategoryIds]=useState([]);
    const [star, setStar]=useState();

    const dispatch=useDispatch();

    const {search}=useSelector((state)=>({...state}));
    const{text}=search;

    useEffect( ()=>{
         loadAllProducts();
         getCategories()
         .then(res=>setCategories(res.data));
    },[]);

    const fetchProducts=(arg)=>{
        fetchProductsByFilter(arg)
            .then(res=>{
                setProducts(res.data);
        })
    }

    //1. load products by default on page load
    const loadAllProducts=()=>{
        setLoading(true);
        getProductsByCount().then((prods)=>{
            console.log('get-products-by-count',prods.data);
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

    

    //3.load products based on price range
    // useEffect(()=>{
       
    //     fetchProducts({price:[parseInt(priceRange.min),parseInt(priceRange.max)]})
    // },[ok]);

    // const handleSlider=(range)=>{
    //         dispatch({
    //             type:'SEARCH_QUERY',
    //             payload:{text:""}
    //         })
    //         setCategoryIds([]);
    //         setStar('');
    //         setPriceRange(range);
    //         setTimeout(()=>{
    //             setOk(!ok);
    //         },300);
           
    // }

    //4. load products based on category
    //show category

    const handleSlider=()=>{
        //
    }

    const handleCheck=()=>{
        //
    }
    // const handleCheck=(e)=>{
    //     dispatch({
    //         type:'SEARCH_QUERY',
    //         payload:{text:""}
    //     })

    //     setPriceRange({min:0,max:0})
    //     setStar('');
    //     let inTheState=[...categoryIds];
    //     let justChecked=e.target.value;
    //     let foundIntheState=inTheState.indexOf(justChecked);
        
    //     if(foundIntheState===-1){
    //         inTheState.push(justChecked);
            
    //     }else{
    //         inTheState.splice(foundIntheState,1);
            
    //     }
        
    //     setCategoryIds(inTheState);
    //     if(inTheState.length > 0){
    //         fetchProducts({category:inTheState});
    //     }else{
    //         loadAllProducts();
    //     }
       
    // }

    // useEffect(()=>{
    //     console.log('setstar',star);
    //     fetchProducts({stars:star})
    // },[star])
    // //5.Show products by star ratings
    // const handleStarClick=(num)=>{
    //     dispatch({
    //         type:'SEARCH_QUERY',
    //         payload:{text:""}
    //     })

    //     setPriceRange({min:0,max:0});
    //     setCategoryIds([]);
    //     setStar(num);
       
    // }

    const handleStarClick=()=>{
        //
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
                    <hr/>
                    <div className="search-categories">
                    <h3>Categories</h3>
                    {categories && categories.map((c)=>{
                        return(
                            <div className="checkbox-div shop-checkbox" key={c._id}>
         
                            <input type="checkbox" 
                                id="aaa" 
                                value={c._id} 
                                onChange={handleCheck}
                                checked={categoryIds.includes(c._id)}
                            />
                            <label htmlFor="aaa">{c.name}</label>
                        </div>
                        
                        )
                        
                    })}
                        
                    </div>
                    <hr/>
                    <div className="star-search-container">
                        <h3>Ratings</h3>
                        <div className="star-search">
                            <StarSearch numberOfStars={5} starClick={handleStarClick} />
                            <StarSearch numberOfStars={4} starClick={handleStarClick} />
                            <StarSearch numberOfStars={3} starClick={handleStarClick} />
                            <StarSearch numberOfStars={2} starClick={handleStarClick} />
                            <StarSearch numberOfStars={1} starClick={handleStarClick} />
                        </div>
                        
                    </div>
                </div>
                <div className="homepage-top-container main-shop-content">
                {products.length<1 && <p>No Products Found</p>}
                {products && products.length > 0 && products.map((product)=>(
                    <HomeTopProductCard key={product._id} product={product} loading={loading} />
                ))}
                </div>
            </div>
            
            
        </>
    )
}

export default Shop;