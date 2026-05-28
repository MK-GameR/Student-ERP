import React from 'react';
import { UserForm } from '../../components/forms/UserForm';

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Profile Node Configuration</h1>
        <p className="text-xs text-gray-400">Inspect system access roles and update communication vectors</p>
      </div>

      <div className="max-w-2xl">
        <UserForm 
          initialData={{
            name: 'Mayur Kumavat',
            email: 'mayurkumavats99@gmail.com',
            role: 'STUDENT',
            department: 'C-DAC Technical Curriculum Matrix'
          }}
        />
      </div>
    </div>
  );
};