import React from 'react';
import { Navigate } from 'react-router-dom';

function isUserLoggedIn() {
    return !!localStorage.getItem('auth-token');
}

const WithAuth = (Component) => {
    return (props) => {
        if (isUserLoggedIn()) {
            return <Component {...props} />;
        } else {
            return <Navigate to="/" />;
        }
    }
}

export default WithAuth;