import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import { NotificationBell } from './NotificationBell';

export const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 w-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-900 px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
      {/* Brand Context Indicator */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center font-black text-xs text-white">
          E
        </div>
        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
          EduSphere Hub
        </span>
      </div>

      {/* Execution Control Toggles */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationBell />
        
        {/* User Identity Frame */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-100 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-xs text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-slate-800">
            {user?.name?.slice(0, 2).toUpperCase() || 'US'}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-none">{user?.name || 'System Actor'}</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">{user?.role || 'Guest'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};