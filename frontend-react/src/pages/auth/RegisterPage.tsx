import React from 'react';
import { RegisterForm } from '../../components/forms/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Identity Allocation Registry</h1>
          <p className="text-xs text-gray-400">Initialize your access parameters within the central ecosystem matrix</p>
        </div>

        <RegisterForm />

        <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
          Already verified?{' '}
          <a href="/auth/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Authenticate session gateway
          </a>
        </p>
      </div>
    </div>
  );
};