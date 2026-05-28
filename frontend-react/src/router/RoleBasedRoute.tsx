import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
// FIX: Removed the unused ROLES object reference
import { type UserRole } from '../config/constants';
import { ROUTES } from '../config/routes';

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Intercept traffic if user doesn't contain matching permissions for the module layout
  const hasAccess = allowedRoles.includes(user.role as UserRole);

  return hasAccess ? <Outlet /> : <Navigate to={ROUTES.UNAUTHORIZED} replace />;
};