import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DepartmentShare {
  name: string;
  value: number;
}

const mockDepartmentAllocation: DepartmentShare[] = [
  { name: 'Computer Applications', value: 450 },
  { name: 'Data Engineering', value: 320 },
  { name: 'Management Systems', value: 280 },
  { name: 'Executive Operations', value: 150 },
];

const METRIC_COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b'];

export const AnalyticsChart: React.FC = () => {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-wide">Departmental Performance Weights</h3>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Capacity tracking allocation indices</p>
      </div>

      <div className="w-full h-56 mt-2 text-[10px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 10 }}>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={6} />
            <Pie
              data={mockDepartmentAllocation}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {mockDepartmentAllocation.map((_, index) => (
                <Cell key={`cell-${index}`} fill={METRIC_COLORS[index % METRIC_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};