import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface UserProfileData {
  name: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  department: string;
}

interface UserFormProps {
  initialData?: UserProfileData;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const [profile, setProfile] = useState<UserProfileData>(initialData || {
    name: '',
    email: '',
    role: 'STUDENT',
    department: 'Computer Applications',
  });
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUpdating(false);
    alert('User security descriptor mappings updated.');
  };

  return (
    <form onSubmit={handleUpdate} className="w-full max-w-xl bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Configure Security Profile Node</h3>
        <p className="text-xs text-gray-400">Override role privileges and registry metadata records</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Profile Descriptive Name"
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <Input
          label="Account Communication Node (Email)"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">RBAC System Role</label>
          <select
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value as any })}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-gray-100 border-gray-300 dark:border-slate-700 focus:ring-blue-500"
          >
            <option value="STUDENT">Student Scholar</option>
            <option value="TEACHER">Academic Instructor</option>
            <option value="ADMIN">System Infrastructure Administrator</option>
          </select>
        </div>

        <Input
          label="Operational Department Domain"
          type="text"
          value={profile.department}
          onChange={(e) => setProfile({ ...profile, department: e.target.value })}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" className="px-6 py-2 text-xs font-semibold" isLoading={updating}>
          Synchronize Parameters
        </Button>
      </div>
    </form>
  );
};