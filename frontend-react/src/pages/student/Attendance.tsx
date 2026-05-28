import React from 'react';
import { AttendanceChart } from '../../components/charts/AttendanceChart';

export const AttendancePage: React.FC = () => {
  const courseLogs = [
    { name: 'Data Structures & Algorithms', code: 'CS-DSA', present: 36, total: 38, pct: 94.7 },
    { name: 'Database Management Systems', code: 'CS-DBMS', present: 28, total: 30, pct: 93.3 },
    { name: 'C++ Architecture Principles', code: 'CS-CPP', present: 24, total: 24, pct: 100 },
    { name: 'Full-Stack Frameworks', code: 'CS-FSD', present: 18, total: 22, pct: 81.8 },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Attendance Audit Register</h1>
        <p className="text-xs text-gray-400">Institutional validation verification metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">Module Aggregates</h3>
          <div className="divide-y divide-gray-100 dark:divide-slate-800 space-y-3 pt-1">
            {courseLogs.map((c, i) => (
              <div key={i} className="flex justify-between items-center pt-3 first:pt-0">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">{c.name}</h4>
                  <p className="text-[10px] font-mono text-gray-400">{c.code} • {c.present}/{c.total} Sessions</p>
                </div>
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                  c.pct >= 90 ? 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                }`}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};