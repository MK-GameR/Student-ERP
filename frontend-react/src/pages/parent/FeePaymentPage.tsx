import React from 'react';
import { FeeForm } from '../../components/forms/FeeForm';

export const FeePaymentPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight">Financial Settlement Hub</h1>
        <p className="text-xs text-gray-400">Manage billing cycles and transaction records</p>
      </div>
      <div className="max-w-md">
        <FeeForm />
      </div>
    </div>
  );
};