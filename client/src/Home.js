import React from 'react';
import Nav from './components/nav'
import Banner from './components/home/Banner';
import NewArrivals from './components/home/NewArrivals';
import BestSellers from './components/home/BestSellers';
import Footer from './components/footer';



const Home=()=>{

    return(
        <>
            <Nav/>
            <Banner />
            <NewArrivals/>
            <BestSellers/>
            <Footer/>
           
        </>
    )
}

export default Home;
