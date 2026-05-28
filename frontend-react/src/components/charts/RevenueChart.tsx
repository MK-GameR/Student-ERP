import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueData {
  month: string;
  collected: number;
  pending: number;
}

const mockRevenueFlow: RevenueData[] = [
  { month: 'Jan', collected: 12000, pending: 4000 },
  { month: 'Feb', collected: 19000, pending: 3000 },
  { month: 'Mar', collected: 15000, pending: 6000 },
  { month: 'Apr', collected: 27000, pending: 2000 },
  { month: 'May', collected: 34000, pending: 5000 },
  { month: 'Jun', collected: 41000, pending: 1500 },
];

export const RevenueChart: React.FC = () => {
  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 tracking-wide">Fee Ledger Collection Stream</h3>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Realized income vs outstanding invoice pipelines</p>
      </div>

      <div className="w-full h-56 mt-4 text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockRevenueFlow} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" className="hidden dark:block" />
            <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
              }}
            />
            <Area type="monotone" dataKey="collected" name="Collected ($)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCollected)" />
            <Area type="monotone" dataKey="pending" name="Pending ($)" stroke="#f59e0b" strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};