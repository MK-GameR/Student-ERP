import React from 'react';
import { RevenueChart } from '../../components/charts/RevenueChart';
import { FeeForm } from '../../components/forms/FeeForm';

export const FeesPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Fee Settlement Portal</h1>
        <p className="text-xs text-gray-400">Process invoices and inspect billing running tracks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <FeeForm />
        </div>
        <div>
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};