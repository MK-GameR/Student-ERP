import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-800/80 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
            EduSphere
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Academic & Operations Resource Management Gateway
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};