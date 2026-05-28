import React from 'react';
import { AssignmentForm } from '../../components/forms/AssignmentForm';

export const AssignmentsPage: React.FC = () => {
  const taskRoster = [
    { title: 'Redux State Management Pipeline', course: 'Full-Stack React Frameworks', remaining: '2 Days Left', complexity: '$O(1)$ State Resolution', status: 'PENDING' },
    { title: 'Relational Calculus Outer Join Queries', course: 'Database Technologies', remaining: 'Passed Due', complexity: 'Index Optimized', status: 'COMPLETED' },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Laboratory Assignment Hub</h1>
        <p className="text-xs text-gray-400">Track and dispatch technical assessment payloads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-gray-400">Assigned Evaluation Queue</h2>
          {taskRoster.map((task, idx) => (
            <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{task.course}</span>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">{task.title}</h3>
                <p className="text-[10px] text-gray-500 font-mono">Target Matrix: {task.complexity}</p>
              </div>
              <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2">
                <span className={`text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded uppercase ${
                  task.status === 'COMPLETED' ? 'bg-green-50 text-green-600 dark:bg-green-950/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                }`}>{task.status}</span>
                <span className="text-[10px] text-gray-400 font-mono">{task.remaining}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <AssignmentForm />
        </div>
      </div>
    </div>
  );
};