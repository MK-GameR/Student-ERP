import React from 'react';
import { AttendanceChart } from '../../components/charts/AttendanceChart';

export const AttendanceTrackingPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight">Attendance Audit Trail</h1>
        <p className="text-xs text-gray-400">Verified session presence records</p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <AttendanceChart />
      </div>
    </div>
  );
};