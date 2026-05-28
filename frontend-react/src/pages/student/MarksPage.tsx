import React from 'react';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';

export const MarksPage: React.FC = () => {
  const reports = [
    { module: 'Data Structures & Algorithms', type: 'End-Semester Exam', evaluation: 'Jan 2026', grade: 'O', validation: 'Module Topper' },
    { module: 'Database Technologies', type: 'Continuous Assessment', evaluation: 'Feb 2026', grade: 'A+', validation: 'Top 5%' },
    { module: 'C++ Systems Programming', type: 'Practical Lab Jury', evaluation: 'Mar 2026', grade: 'O', validation: 'Perfect Assessment' },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Academic Performance Ledger</h1>
        <p className="text-xs text-gray-400">Verified certification grades and evaluation metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {reports.map((r, i) => (
            <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-1.5 py-0.5 rounded">
                  {r.type}
                </span>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white mt-1.5">{r.module}</h3>
                <p className="text-[10px] text-gray-400">{r.evaluation} • Logged via system authorization matrix</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{r.grade}</div>
                <div className="text-[9px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/20 px-1.5 py-0.5 rounded mt-1 whitespace-nowrap">{r.validation}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
};