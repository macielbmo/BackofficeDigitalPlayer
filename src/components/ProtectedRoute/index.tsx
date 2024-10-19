import { Navigate } from "react-router-dom";
import { useAuth } from "../../../services/AuthContext";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { valid, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!valid) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
