import React from 'react';
import { Bell } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight">Guardian Notification Feed</h1>
        <p className="text-xs text-gray-400">Institutional event telemetry</p>
      </div>
      <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 divide-y divide-gray-100 dark:divide-slate-800">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="p-4 flex gap-4">
            <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold">New Assessment Schedule</h4>
              <p className="text-[10px] text-gray-400">Final Jury evaluations scheduled for June 2026.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};