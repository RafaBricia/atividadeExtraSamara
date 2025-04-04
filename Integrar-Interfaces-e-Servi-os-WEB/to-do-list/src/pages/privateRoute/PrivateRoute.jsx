import { Navigate } from "react-router-dom";

function PrivateRoute({element}){
    const token = localStorage.getItem('authToken');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return element;
}

export default PrivateRoute;