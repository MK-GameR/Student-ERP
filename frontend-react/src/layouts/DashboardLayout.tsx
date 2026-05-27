import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../app/providers/ThemeProvider';
import { useAppSelector } from '../app/hooks';
import { 
  Menu, X, Sun, Moon, LogOut, Bell, Shield, 
  BookOpen, Wifi 
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const unreadNotifications = useAppSelector((state) => state.notification.unreadCount);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 configuration-transition">
      
      {/* Responsive Sidebar Menu panel container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <BookOpen className="w-6 h-6" />
            <span>EduSphere ERP</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Workspace Shell Links
          </div>
          <Link 
            to={`/${user?.role}/dashboard`} 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          >
            <Shield className="w-4 h-4" />
            <span>Main Dashboard</span>
          </Link>
        </nav>
      </aside>

      {/* Main Frame Shell Execution Workspace Context window panel area viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Global Toolbar Header Engine */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-xs text-green-500 gap-1 font-medium bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full">
                <Wifi className="w-3 h-3" /> Sandbox Mode Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-pointer">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </div>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-semibold truncate max-w-[120px]">{user?.name}</span>
                <span className="text-xs text-gray-400 uppercase font-bold tracking-tight">{user?.role}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content Injector Outlet */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};