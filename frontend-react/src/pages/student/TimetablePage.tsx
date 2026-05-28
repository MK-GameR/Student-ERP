import React from 'react';

export const TimetablePage: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timetable = [
    { time: '09:00 AM - 11:00 AM', subject: 'Data Structures Lab', room: 'Lab Node 3', instructor: 'Dr. Amar Panchal' },
    { time: '11:15 AM - 01:15 PM', subject: 'Advanced Relational Database Logic', room: 'Theater B', instructor: 'Prof. S. Sharma' },
    { time: '02:00 PM - 04:00 PM', subject: 'C++ Systems Engineering', room: 'Seminar Hall 1', instructor: 'Dr. Amar Panchal' },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Academic Calendar Matrix</h1>
          <p className="text-xs text-gray-400">Chronological routing schema for current modules</p>
        </div>
        <div className="flex gap-1 bg-gray-200/60 dark:bg-slate-900 p-1 rounded-xl text-[11px] font-bold overflow-x-auto">
          {days.map((d, idx) => (
            <button key={idx} className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${idx === 0 ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500'}`}>
              {d.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="divide-y divide-gray-100 dark:divide-slate-800/60">
          {timetable.map((slot, i) => (
            <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-lg">
                  {slot.time}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{slot.subject}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{slot.instructor} • <span className="font-medium text-gray-500 dark:text-gray-300">{slot.room}</span></p>
                </div>
              </div>
              <button className="text-[11px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                Launch Workspace
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};