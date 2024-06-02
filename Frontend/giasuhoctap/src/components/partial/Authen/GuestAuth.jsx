import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function GuestAuth({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}