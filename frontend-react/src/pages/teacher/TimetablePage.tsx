// src/pages/teacher/TimetablePage.tsx
import React from 'react';

export const TimetablePage: React.FC = () => {
  const schedule = [{ time: '09:00', subj: 'Data Structures' }, { time: '11:00', subj: 'DBMS' }];
  
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl font-black">Lecture Schedule</h1>
      <div className="space-y-3">
        {schedule.map((item, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border flex gap-6 items-center">
            <span className="font-mono text-blue-600 font-bold">{item.time}</span>
            <span className="font-bold">{item.subj}</span>
          </div>
        ))}
      </div>
    </div>
  );
};