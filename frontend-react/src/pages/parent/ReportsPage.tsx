import React from 'react';
import { FileText, Download } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight">Performance Dossiers</h1>
        <p className="text-xs text-gray-400">Generate and export official academic transcripts</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        {[ 'Semester I Summary', 'Annual Attendance Record', 'Financial Clearance Report' ].map((r, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-bold">{r}</span>
            </div>
            <button className="text-blue-600"><Download className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};