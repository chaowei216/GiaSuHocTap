import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function GuestAuth({ children }) {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated) {
        if (user && (user?.roleName == "Moderator" || user?.roleName == "Admin")) {
            return <Navigate to="/dashboard" />;
        } else if (user && user?.roleName == "Tutor") {
            return <Navigate to="/home-tutor" />;
        }
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}