import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function GuestAuth({ children }) {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated) {
        if (user?.roleName == "Admin") {
            return <Navigate to="/test" />;
        }
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}