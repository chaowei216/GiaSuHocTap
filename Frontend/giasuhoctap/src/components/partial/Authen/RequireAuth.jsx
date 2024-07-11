import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import LoginPage from "../../../pages/AuthenPage/LoginPage";
import GlobalLoading from "../../global/GlobalLoading"

const RequireAuth = ({ children }) => {
    const { isInitialized, isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isInitialized) {
        return <GlobalLoading isLoading={!isInitialized} />
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <LoginPage />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
};

export default RequireAuth;