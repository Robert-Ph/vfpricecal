import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/sign-in" state={{ from: location }} replace />
    );
};
export default PrivateRoute;