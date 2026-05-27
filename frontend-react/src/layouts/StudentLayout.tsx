import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
// Removed ShieldAlert to fix the unused variable compiler error
import { BookOpen, Calendar, CreditCard, BrainCircuit } from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Student Dashboard', path: '/student/dashboard', icon: BookOpen },
    { name: 'My Attendance Logs', path: '/student/attendance', icon: Calendar },
    { name: 'Fee Ledger Tracker', path: '/student/fees', icon: CreditCard },
    { name: 'AI Performance Desk', path: '/student/ai-desk', icon: BrainCircuit },
  ];

  // Custom internal contextual sub-navigation implementation for child templates
  const renderStudentSidebarExtension = (
    <div className="space-y-1 px-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Student Modules
      </div>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );

  return <DashboardLayout sidebarExtension={renderStudentSidebarExtension} />;
};