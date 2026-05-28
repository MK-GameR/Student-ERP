import React from 'react';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';


export const ChildProgressPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight">Academic Progress Metrics</h1>
        <p className="text-xs text-gray-400">Institutional performance trajectory for your ward</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div className="space-y-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-4">Key Milestones</h3>
            <div className="space-y-3">
              {[ { title: 'DSA Certification', status: 'Completed' }, { title: 'C++ Systems Architecture', status: 'In-Progress' } ].map((m, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{m.title}</span>
                  <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950/20 text-blue-600 px-2 py-0.5 rounded">{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};