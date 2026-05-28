// src/pages/teacher/StudentAnalyticsPage.tsx
import React from 'react';

export const StudentAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl font-black">Classroom Telemetry</h1>
      <div className="bg-white p-6 rounded-2xl border min-h-[300px] flex items-center justify-center border-dashed">
        <p className="text-gray-400 text-sm">Performance distribution charts will render here.</p>
      </div>
    </div>
  );
};