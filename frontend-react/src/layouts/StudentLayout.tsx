import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import { HomeIcon, SparklesIcon, WalletIcon, BookOpenIcon } from '../assets/icons/icons';

export const StudentLayout: React.FC = () => {
  const location = useLocation();

  const links = [
    { name: 'Student Hub', path: ROUTES.STUDENT.DASHBOARD, icon: HomeIcon },
    { name: 'AI Assistance Desk', path: ROUTES.STUDENT.AI_DESK, icon: SparklesIcon },
    { name: 'Performance Logs', path: ROUTES.STUDENT.ANALYTICS, icon: BookOpenIcon },
    { name: 'Fee Ledgers', path: ROUTES.STUDENT.FEES, icon: WalletIcon },
  ];

  return (
    <div className="flex w-full h-full overflow-hidden">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col p-4 pt-20">
        <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-4 mb-4">Workspace</h2>
        <nav className="space-y-1 flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition ${
                  isActive ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 pt-24 bg-gray-50 dark:bg-gray-950/40">
        <Outlet />
      </main>
    </div>
  );
};