import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ROUTES } from '../config/routes';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect unauthenticated traffic to login page while saving the current target route
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
  );
};