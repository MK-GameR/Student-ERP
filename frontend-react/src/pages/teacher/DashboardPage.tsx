import React from 'react';
import { BookOpen, Users, Clock, AlertTriangle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <h1 className="text-xl font-black">Faculty Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Modules', val: '04', icon: BookOpen },
          { label: 'Student Load', val: '142', icon: Users },
          { label: 'Pending Evaluations', val: '12', icon: Clock },
          { label: 'Alerts', val: '03', icon: AlertTriangle, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-white dark:bg-slate-900 border rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">{stat.label}</p>
              <p className="text-xl font-black">{stat.val}</p>
            </div>
            <stat.icon className={`h-5 w-5 ${stat.color || 'text-blue-500'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};