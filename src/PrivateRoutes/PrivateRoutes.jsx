import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/shared/Loading/Loading';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoutes;
