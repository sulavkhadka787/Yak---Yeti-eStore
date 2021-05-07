import React,{useEffect,useState} from 'react';
import {getProductsByCount,fetchProductsByFilter} from '../functions/product';
import {getCategories} from '../functions/category';
import {getSubs} from '../functions/sub';
import {useSelector,useDispatch} from 'react-redux';
import HomeTopProductCard from '../components/cards/homeTopProductCard';
import Nav from '../components/nav';
import PriceSlider from '../components/PriceSlider';
import StarSearch from '../components/StarSearch';


const Shop=()=>{

    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [priceRange,setPriceRange]=useState(0);
    const [ok,setOk]=useState(false);
    const [categories,setCategories]=useState([]);
    const [categoryIds,setCategoryIds]=useState([]);
    const [load, setLoad]=useState(false);
    const [star,setStar]=useState();
    const [subs,setSubs]=useState([]);
    const [sub,setSub]=useState([]);
    const [shipping ,setShipping]=useState('');

    let search=useSelector((state)=>(state.search));
    const {text}=search;

    const dispatch=useDispatch();

    useEffect(()=>{
       
        console.log('!shopage-loadall triggered');
        loadAllProducts();
        getCategories().then(res=>setCategories(res.data));
        getSubs().then(res=>setSubs(res.data))
    },[])

    
    //1.load products by default on page load
    const loadAllProducts=()=>{
        getProductsByCount(6).then(res=>setProducts(res.data))  
    }

    const fetchProducts=(arg)=>{
        console.log('fetchproduct-----====');
        fetchProductsByFilter(arg).then((res)=>{
            
            setProducts(res.data);
        })
    }

    //2.load products on user search input
    useEffect(()=>{
        //console.log('load products on user search input',text);
        setCategoryIds([]);
        setPriceRange(0);
        setStar('');
        setSub('');
        setShipping('');
        const delayed=setTimeout(()=>{
            fetchProducts({query:text});
            if(!text){
                console.log('!text-loadall triggered');
                loadAllProducts();
            }
     },300);

        return ()=>clearTimeout(delayed);
        
    },[text]);

    //3.load products based on price range

    useEffect(()=>{
       
        fetchProducts({price:[parseInt(priceRange.min),parseInt(priceRange.max)]})
    },[ok]);

    // const handleslider=(range)=>{
    //     console.log('range-rang',range);
    //     dispatch({
    //         type:'SEARCH_QUERY',
    //         payload:{text:''}
    //     })
    //     setPriceRange(range);
    //     setStar('');
    //     setSub('');
    //     setShipping('');
    //     setTimeout(()=>{
    //         setOk(!ok);
    //     },300);
    // }

    //4.load prouducts by category
    const handleCheck=(e)=>{
        console.log('check',e.target.value);

        let inTheState=[...categoryIds];
        let justChecked=e.target.value;
        let foundInTheState=inTheState.indexOf(justChecked);

        // dispatch({
        //     type:'SEARCH_QUERY',
        //     payload:{text:e.target.value}
        // })

        setPriceRange(0);
        setStar('');
        setSub('');
        setShipping('');
        if(foundInTheState ===-1){
            inTheState.push(justChecked)
        }else{
            inTheState.splice(foundInTheState,1);
        }
        setCategoryIds(inTheState);
        if(inTheState.length >0){
            fetchProducts({category:inTheState})
        }else{
            loadAllProducts();
        }
        
    }

    const refreshPage=()=>{
        console.log('refresh-paeg');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    }   
    
    //5 show products by star rating
    const handleStarClick=(num)=>{
        console.log('star',num);
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:''}
        })
        setShipping('');
        setPriceRange(0);
        setCategoryIds([]);
       setStar(num);
       setSub('');
       fetchProducts({stars:num});
    }

    //6 show subs
    const handleSub=(s)=>{
        console.log(s);
        setShipping('');
        setSub(s);
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:''}
        })

        setPriceRange(0);
        setCategoryIds([]);
       setStar('');
       fetchProducts({sub:s});
    }

    //7.shipping
    
    const handleShipping=(e)=>{
        console.log('shipping',e.target.value);
        setShipping(e.target.value);
        setSub([]);
        dispatch({
            type:'SEARCH_QUERY',
            payload:{text:''}
        })

        setPriceRange(0);
        setCategoryIds([]);
        setStar('');
        fetchProducts({shipping:e.target.value})
    }

    return(
        <>
            <Nav/>
            
            <div className="search-container">
                <div className="search-sidebar">
           
                    <h3>Search/Filter</h3>
                    <div className="price-range">
                        <h3>Price Range</h3>
                        <PriceSlider 
                            priceRange={priceRange} 
                            setPriceRange={setPriceRange}
                           
                            setStar={setStar}
                            setSub={setSub}
                            setShipping={setShipping}
                            setOk={setOk}
                            ok={ok}
                            />
                     
                    </div>  
                    <hr className="hr"/>  
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

                    <hr className="hr"/>
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
                    <hr className="hr"/>
                    <div className="search-categories">
                    <h3>Sub-Categories</h3>
                    <div className="sub-cats">
                        {subs.map((s)=>{
                            return (
                                    <p onClick={()=>handleSub(s)} className="sub-cats-name" key={s._id}>{s.name}</p>
                            )
                        })}
                    </div>
                        
                    </div>
                    <hr className="hr"/>
                    <div>
                    <h3>Shipping Available </h3>
                    <div>
                    <div className="radio-container">
                        <div>
                            <input id="yes" type="radio" name="shipping" value='Yes' onClick={handleShipping}/>
                            <label htmlFor="yes">Yes</label>
                        </div>
                        
                        <div>
                            <input id="no" type="radio" name="shipping" value='No' onClick={handleShipping}/>
                            <label htmlFor="no">No</label>
                        </div>
                        
                    </div>    
                    </div>
                    </div>
                </div>
                <div className="homepage-top-container main-shop-content">
                {products.length <1 && <a onClick={refreshPage}> <strong className="refresh">Click to Refresh </strong></a>}
                    {products.map((product)=><HomeTopProductCard key={product._Id} product={product} key={product._id}/>)}
                        
                </div>  
            </div>
        </>
    )
}

export default Shop;