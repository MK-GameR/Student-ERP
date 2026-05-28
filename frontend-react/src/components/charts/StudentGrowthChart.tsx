import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthData {
  quarter: string;
  enrollments: number;
}

const mockStudentGrowth: GrowthData[] = [
  { quarter: 'Q1-25', enrollments: 1100 },
  { quarter: 'Q2-25', enrollments: 1250 },
  { quarter: 'Q3-25', enrollments: 1420 },
  { quarter: 'Q4-25', enrollments: 1390 },
  { quarter: 'Q1-26', enrollments: 1680 },
  { quarter: 'Q2-26', enrollments: 1850 },
];

export const StudentGrowthChart: React.FC = () => {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-wide">Enrollment Expansion Index</h3>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Aggregated student growth mappings</p>
      </div>

      <div className="w-full h-56 mt-4 text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockStudentGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" className="hidden dark:block" />
            <XAxis dataKey="quarter" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} domain={['dataMin - 200', 'dataMax + 200']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
              }}
            />
            <Line type="monotone" dataKey="enrollments" name="Total Students" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};