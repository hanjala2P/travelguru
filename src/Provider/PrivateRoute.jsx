import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  
    const { user, loading } = use(AuthContext); 
    const location = useLocation();

   
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

  
    if (user) {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;