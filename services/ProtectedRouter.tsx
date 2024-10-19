import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element }: any) => {
    const { token, loading, valid } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token || valid === null) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
