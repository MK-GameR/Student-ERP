// src/pages/teacher/ExamManagementPage.tsx
import React from 'react';

export const ExamManagementPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl font-black">Examination Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border shadow-sm">
          <h2 className="text-sm font-bold mb-4">Create New Assessment</h2>
          <input type="text" placeholder="Exam Name" className="w-full p-3 border rounded-lg mb-4 text-sm" />
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold">Schedule Exam</button>
        </div>
      </div>
    </div>
  );
};