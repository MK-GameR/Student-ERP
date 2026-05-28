import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarItem {
  label: string;
  roles: string[];
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navigationManifest: SidebarItem[] = [
    {
      label: 'Core Dashboard',
      roles: ['STUDENT', 'TEACHER', 'PARENT', 'PRINCIPAL'],
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V16zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V16z" />
        </svg>
      ),
    },
    {
      label: 'Class Rosters',
      roles: ['TEACHER', 'PRINCIPAL'],
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      label: 'Fee Ledger Records',
      roles: ['STUDENT', 'PARENT', 'ACCOUNTING', 'PRINCIPAL'],
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      label: 'AI Performance Metrics',
      roles: ['STUDENT', 'PRINCIPAL', 'TEACHER'],
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  // Restrict navigation arrays via client role access profiles
  const allowedMenuItems = navigationManifest.filter(
    (item) => user?.role && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 border-r border-gray-200 dark:border-slate-900 flex flex-col justify-between p-4 transition-colors">
      {/* Route Links */}
      <nav className="flex flex-col gap-1">
        {allowedMenuItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors text-left
              ${idx === 0 
                ? 'bg-blue-50/60 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-slate-900/60 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Security Terminal Outbox */}
      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors text-left"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Unregister Session
      </button>
    </aside>
  );
};