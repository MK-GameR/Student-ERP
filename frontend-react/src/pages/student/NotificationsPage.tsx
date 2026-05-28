import React from 'react';
import {  ShieldAlert, Award, Calendar } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const broadcastLogs = [
    { head: 'Group Discussion Placement Prep scheduled', desc: 'Syllabus alignment discussion on global resource logistics set for morning sessions.', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
    { head: 'C++ Module Verification Clearance', desc: 'Your final laboratory performance code compilation metrics have passed systemic credential audits.', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    { head: 'System Infrastructure Security Maintenance', desc: 'Central authorization database routing clusters will undergo automated migration loops at 02:00 AM.', icon: ShieldAlert, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">System Broadcast Log</h1>
        <p className="text-xs text-gray-400">Real-time system events streaming directly from the main administrative hub</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm max-w-3xl">
        <div className="divide-y divide-gray-100 dark:divide-slate-800/60">
          {broadcastLogs.map((b, i) => (
            <div key={i} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
              <div className={`p-2 rounded-xl shrink-0 ${b.bg} ${b.color}`}>
                <b.icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">{b.head}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">{b.desc}</p>
                <span className="block text-[9px] font-mono text-gray-400 pt-1">Timestamp: 2026-05-28 • Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};