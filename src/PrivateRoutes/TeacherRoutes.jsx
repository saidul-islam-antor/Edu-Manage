import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loading from '../pages/shared/Loading/Loading';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const TeacherRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== 'teacher') {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default TeacherRoutes;
