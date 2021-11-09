import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/isLogin';
import Navbar from './navbar';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/app" />
            : 
            <>
                <Navbar />
                <Component {...props} />
            </>
        )} />
    );
};

export default PublicRoute;