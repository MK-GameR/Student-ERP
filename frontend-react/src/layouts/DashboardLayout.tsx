import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useTheme } from '../app/providers/ThemeProvider';
import { ROUTES } from '../config/constants';

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Route security shield guard check
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
      {/* Structural layout wrapper where role sub-sidebars are cleanly injected alongside context */}
      <div className="flex flex-1 overflow-hidden">
        <Outlet />

        {/* Global Control Canvas (Top Navigation + Right Frame Elements can be globally handled here) */}
        <div className="absolute top-4 right-6 flex items-center space-x-4 z-50">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Interface Mode"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{user?.role}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name || 'Authorized Member'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-950/20 text-sm font-medium transition"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};