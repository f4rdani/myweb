import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element }) => {
    const isAutehnticated = Cookies.get("userId");

    return isAutehnticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;