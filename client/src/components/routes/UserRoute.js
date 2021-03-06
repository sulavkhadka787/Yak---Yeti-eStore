import React from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToDirect from './LoadingToDirect';

const UserRoute=({children,...rest})=>{

    const {user}=useSelector((state)=>({...state}));

    return user && user.token ? (
        <Route {...rest} />
    ) 
    :
    (
        <LoadingToDirect />
    )

}

export default UserRoute;