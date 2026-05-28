import React from 'react';
import {  MessageSquare } from 'lucide-react';

export const TeacherCommunicationPage: React.FC = () => {
  const threads = [
    { name: 'Dr. Amar Panchal', role: 'Data Structures Lead', lastActive: '2h ago' },
    { name: 'Prof. S. Sharma', role: 'Database Technologies', lastActive: '1d ago' },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight">Faculty Liaison Portal</h1>
        <p className="text-xs text-gray-400">Direct secure communication routing</p>
      </div>
      <div className="grid gap-4 max-w-2xl">
        {threads.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center text-blue-600">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">{t.name}</h4>
                <p className="text-[10px] text-gray-400">{t.role}</p>
              </div>
            </div>
            <button className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">Message</button>
          </div>
        ))}
      </div>
    </div>
  );
};