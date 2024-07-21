import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./auth";

interface ProtectedRouteProps {
    isAllowed?: string;
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    isAllowed,
    children,
}) => {
    const { user, isAuthenticated, refreshUserData } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            refreshUserData();
        }
    }, []);

    if (!user || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isAllowed && isAllowed !== user.role) {
        return <Navigate to="/login" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
