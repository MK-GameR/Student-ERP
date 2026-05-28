import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'Credentials mismatched. Verify input strings.' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulated API submission pipeline endpoint
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus({ type: 'success', message: 'Account request dispatched for structural review.' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to register record parameters.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Enroll Identity</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500">Register a brand new core student or staff log</p>
      </div>

      {status && (
        <div className={`p-3 text-xs font-medium rounded-lg border ${
          status.type === 'success' 
            ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30' 
            : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30'
        }`}>
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Full Legal Name"
          type="text"
          placeholder="Mayur Kumavat"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Preferred Email"
          type="email"
          placeholder="mayur@institution.edu"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      </div>

      <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-semibold" isLoading={isSubmitting}>
        Provision Credentials
      </Button>
    </form>
  );
};