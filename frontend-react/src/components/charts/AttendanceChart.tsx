import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AttendanceData {
  day: string;
  present: number;
  absent: number;
}

const mockWeeklyAttendance: AttendanceData[] = [
  { day: 'Mon', present: 420, absent: 15 },
  { day: 'Tue', present: 432, absent: 8 },
  { day: 'Wed', present: 415, absent: 23 },
  { day: 'Thu', present: 440, absent: 5 },
  { day: 'Fri', present: 398, absent: 41 },
];

export const AttendanceChart: React.FC = () => {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-wide">Attendance Registry Analytics</h3>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Weekly running metric profiles</p>
      </div>

      <div className="w-full h-56 mt-4 text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockWeeklyAttendance} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" className="hidden dark:block" />
            <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
              }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" iconSize={6} />
            <Bar dataKey="present" name="Present" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};