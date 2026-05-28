// src/pages/teacher/AttendanceMarkingPage.tsx
import React, { useState } from 'react';
import { Save, Check, X } from 'lucide-react';

export const AttendanceMarkingPage: React.FC = () => {
  const [roster] = useState([
    { id: 1, name: 'Mayur Kumavat', roll: 'MCA-01', status: 'Present' },
    { id: 2, name: 'Rahul Sharma', roll: 'MCA-02', status: 'Absent' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-black">Attendance Ledger</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
          <Save className="w-4 h-4" /> Commit Ledger
        </button>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Roll No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {roster.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4 font-mono font-bold">{s.roll}</td>
                <td className="px-6 py-4">{s.name}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600"><Check /></button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-600"><X /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};