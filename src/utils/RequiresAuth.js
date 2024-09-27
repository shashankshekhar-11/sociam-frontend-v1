import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {

    const { authToken } = useSelector((store) => store.auth);
    const location = useLocation();

    return authToken ? children :

        <Navigate to="/login" state={{ from: location }} replace />

};

export default RequireAuth;
