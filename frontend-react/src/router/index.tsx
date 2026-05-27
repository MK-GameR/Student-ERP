import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleBasedRoute } from './RoleBasedRoute';
import { ROUTES, ROLES } from '../config/constants';

// Fake placeholder components to satisfy early engine generation without compilation breaks
const LoginPlaceholder = () => <div className="p-8">Login Page Component</div>;
const UnauthorizedPlaceholder = () => <div className="p-8 text-red-600 font-bold">403 - Unauthorized Access</div>;
const AdminDash = () => <div className="p-6">Admin Management Command Center</div>;
const TeacherDash = () => <div className="p-6">Teacher Portal Gradebook</div>;
const StudentDash = () => <div className="p-6">Student Assignment and Analytics Dashboard</div>;

export const router = createBrowserRouter([
  // Public Paths
  {
    path: '/login',
    element: <LoginPlaceholder />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPlaceholder />,
  },

  // Guarded Enterprise Infrastructure Routes
  {
    element: <ProtectedRoute />,
    children: [
      // Admin Only Route Gateway
      {
        element: <RoleBasedRoute allowedRoles={[ROLES.SUPER_ADMIN]} />,
        children: [
          { path: '/admin/dashboard', element: <AdminDash /> },
        ],
      },
      // Teacher Only Route Gateway
      {
        element: <RoleBasedRoute allowedRoles={[ROLES.TEACHER]} />,
        children: [
          { path: '/teacher/dashboard', element: <TeacherDash /> },
        ],
      },
      // Student Only Route Gateway
      {
        element: <RoleBasedRoute allowedRoles={[ROLES.STUDENT]} />,
        children: [
          { path: '/student/dashboard', element: <StudentDash /> },
        ],
      },
    ],
  },

  // Fallback Catchall Route
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);