import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Fixed the typo in the import path
import { DashboardLayout } from './DashboardLayout';
import { GraduationCap, ClipboardCheck, Users } from 'lucide-react'; // Removed unused MessageSquare icon

export const TeacherLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Teacher Command Center', route: '/teacher/dashboard', icon: GraduationCap },
    { label: 'Mark Class Attendance', route: '/teacher/attendance-control', icon: ClipboardCheck },
    { label: 'Student Roster Group', route: '/teacher/roster', icon: Users },
  ];

  // Map out the teacher specific menu items dynamically
  const renderTeacherSidebarExtension = (
    <div className="space-y-1 px-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Teacher Modules
      </div>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.route;
        return (
          <Link
            key={item.route}
            to={item.route}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  // Pass the generated menu straight down to the dashboard shell
  return <DashboardLayout sidebarExtension={renderTeacherSidebarExtension} />;
};